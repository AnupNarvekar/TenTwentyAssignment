import Contest from '../models/contestModel.js';
import Question from '../models/questionModel.js';
import Submission from '../models/submissionModel.js';
import Leaderboard from '../models/leaderboardModel.js';
import USER_TYPE from '../constants/user.js';


const ContestController = {

    getAllContests: async (req, res) => {
        try {
            const contests = await Contest.find({}).sort({ startTime: -1 });
            res.send(contests);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    getContestById: async (req, res) => {
        try {

            const contest = await Contest.findById(req.params.contestId);

            if (!contest) {
                return res.status(404).send({ message: 'Contest not found' });
            }

            // Populate questions if contest is active or ended
            const now = new Date();
            if (now >= contest.startTime) {
                await contest.populate('questions');
            }

            res.send(contest);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    participate: async (req, res) => {
        try {
            const contestId = req.params.contestId;
            const userId = req.user._id;

            // Check if contest exists and is active
            const contest = await Contest.findById(contestId);

            if (!contest) {
                return res.status(404).send({ message: 'Contest not found' });
            }

            console.log(contest.isVipOnly);
            console.log(req.user.userType == USER_TYPE.NORMAL);

            const isUserAllowedToParticipate = ((contest.isVipOnly == false) && (req.user.userType == USER_TYPE.NORMAL))

            if (!isUserAllowedToParticipate) {
                return res.status(404).send({ message: 'Contest restricted to VIP users only' });
            }


            // Create participation
            const participation = await Submission.create({
                userId,
                contestId,
                submittedAt: null
            });


            res.status(201).send(participation);


        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    submitContest: async (req, res) => {
        try {
            const { answers } = req.body;
            const contestId = req.params.contestId;
            const userId = req.user._id;

            // Check if contest exists and is active
            const contest = await Contest.findById(contestId);

            if (!contest) {
                return res.status(404).send({ message: 'Contest not found' });
            }

            const now = new Date();
            if (now < contest.startTime || now > contest.endTime) {
                return res.status(400).send({ message: 'Contest is not active' });
            }

            // Check if user had participated
            const participation = await Submission.findOne({
                userId,
                contestId
            });

            if (!participation) {
                return res.status(400).send({ message: 'You have not participated in this contest' });
            }

            // Check if user had participated and already submitted the answers
            if (participation.submittedAt) {
                return res.status(400).send({ message: 'You have already submitted answers for this contest' });
            }

            // Get questions and calculate score
            const questions = await Question.find({ _id: { $in: contest.questions } });

            let score = 0;
            questions.forEach((question) => {
                const userAnswer = answers[question._id.toString()];
                if (userAnswer && userAnswer === question.correctAnswer) {
                    score += question.score;
                }
            });

            // Create submission
            const submission = await Submission.create({
                userId,
                contestId,
                answers,
                score,
                submittedAt: now,
            });

            // Update or create leaderboard entry
            await Leaderboard.findOneAndUpdate(
                { contestId, userId },
                { score },
                { upsert: true, new: true }
            );

            // Update ranks in leaderboard
            const leaderboardEntries = await Leaderboard.find({ contestId })
                .sort({ score: -1 });

            for (let i = 0; i < leaderboardEntries.length; i++) {
                await Leaderboard.findByIdAndUpdate(
                    leaderboardEntries[i]._id,
                    { rank: i + 1 }
                );
            }

            res.status(201).send(submission);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    getLeaderboard: async (req, res) => {
        try {

            // Check if contest exists and is active
            const contest = await Contest.findById(req.params.contestId);
            console.log(contest);

            if (!contest) {
                return res.status(404).send({ message: 'Contest does not exist' });
            }

            const leaderboard = await Leaderboard.find({ contestId: req.params.contestId })
                .populate('userId', 'name')
                .sort({ rank: 1 });

            res.send(leaderboard);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    }

};

export default ContestController;