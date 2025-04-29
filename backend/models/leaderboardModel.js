import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique contest-user pair
leaderboardSchema.index({ contestId: 1, userId: 1 }, { unique: true });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;