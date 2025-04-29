import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    prize: {
      type: String,
      required: true,
      default: "$10 Amazon gift card"
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    isVipOnly: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

const Contest = mongoose.model('Contest', contestSchema);

export default Contest;