import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { useVerifyUserMutation } from "../redux/slices/UserSlice";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  // safely get email
  const email = location.state?.email || "";
  console.log("Email received:", email);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, []);

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (index === otp.length - 1 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === otp.length) {
        handleVerifyOtp(fullOtp);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pastedData)) {
      const otpArray = pastedData.split("");
      setOtp(otpArray);
      inputRefs.current[otp.length - 1].focus();
    }
  };

  const handleVerifyOtp = async (otpCode) => {
    try {
      const result = await verifyUser({ email, otpCode }).unwrap();
      toast.success(result.message);
      navigate("/");
    } catch (err) {
      console.error("Verify User failed:", err);
      setError("Invalid OTP. Please try again.");
    }
  };

  const formatEmail = (email) => {
    if (!email) return "Unknown email";
    const [username, domain] = email.split("@");
    return `${username.slice(0, 3)}***@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/signup"
              className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors mb-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Sign Up
            </Link>

            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="h-8 w-8 text-indigo-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>

            <p className="text-gray-600 mb-2">We've sent a 4-digit code to</p>

            <div className="flex items-center justify-center text-gray-700 font-medium">
              <FaEnvelope className="h-4 w-4 text-indigo-500 mr-2" />
              {formatEmail(email)}
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter verification code
            </label>

            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-2xl text-center font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-colors"
                  disabled={isLoading}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center mt-4">{error}</p>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={() => handleVerifyOtp(otp.join(""))}
            disabled={isLoading || otp.some((digit) => digit === "")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center text-sm text-gray-600">
            {canResend ? (
              <button
                onClick={() => {
                  setCountdown(60);
                  setCanResend(false);
                  toast.info("OTP resent successfully!");
                }}
                className="text-indigo-600 font-medium hover:underline"
              >
                Resend Code
              </button>
            ) : (
              <p>
                Resend available in{" "}
                <span className="font-semibold">{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
