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
      'Service Quality', 
      'Staff Feedback', 
      'Facilities', 
      'Booking Process', 
      'Booking Issue',
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
    enum: ['Email', 'WhatsApp'],
    default: 'Web'
  }
}, {
  timestamps: true
});

// Indexes
feedbackSchema.index({ email: 1, createdAt: -1 });
feedbackSchema.index({ rating: 1, createdAt: -1 });
feedbackSchema.index({ station: 1, createdAt: -1 });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;