import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  station: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  feedbackType: {
    type: String,
    required: true,
    enum: [
      // Complaint types
      'Baggage', 
      'Flight Delay', 
      'Booking Issue', 
      'Accessibility',
      'Customer Service', 
      'Refund',
      // Feedback types
      'Service Quality', 
      'Staff Feedback', 
      'Facilities', 
      'Booking Process', 
      'Overall Experience', 
      'Other'
    ]
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  details: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 2000
  },
  flightNumber: {
    type: String,
    trim: true,
    uppercase: true,
    maxLength: 10
  },
  bookingReference: {
    type: String,
    trim: true,
    uppercase: true,
    maxLength: 20
  },
  dateOfExperience: {
    type: Date,
    required: true
  },
  // Complaint-specific fields
  status: {
    type: String,
    enum: ['Pending', 'In Review', 'Resolved', 'Closed'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  resolution: {
    type: String,
    maxLength: [1000, 'Resolution notes cannot exceed 1000 characters']
  },
  followUp: {
    type: Boolean,
    default: false
  },
  // General fields
  isAnonymous: {
    type: Boolean,
    default: false
  },
  canContact: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    enum: ['Web', 'Email', 'WhatsApp'],
    default: 'Web'
  }
}, {
  timestamps: true
});

// Virtual to check if it's a complaint
feedbackSchema.virtual('isComplaint').get(function() {
  const complaintTypes = [
    'Baggage', 'Flight Delay', 'Booking Issue', 'Accessibility',
    'Customer Service', 'Refund', 'Other'
  ];
  return complaintTypes.includes(this.feedbackType);
});

// Indexes
feedbackSchema.index({ email: 1, createdAt: -1 });
feedbackSchema.index({ rating: 1, createdAt: -1 });
feedbackSchema.index({ station: 1, createdAt: -1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ feedbackType: 1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;