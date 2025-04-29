import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    questType: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

export default Question;