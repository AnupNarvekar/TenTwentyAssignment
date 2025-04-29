import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import Submission from '../models/submissionModel.js';
import USER_TYPE from '../constants/user.js';

const UserController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!(name && email && password)) {
                return res.status(400).send({ Error: "Payload missing. Please check the API docs." });
            }

            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).send({ message: 'User already exists' });
            }

            const user = await User.create({
                name,
                email,
                password,
            });

            if (user) {
                res.status(201).send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(400).send({ message: 'Invalid user data' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                return res.status(400).send({ Error: "Payload missing. Please check the API docs." });
            }

            const user = await User.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                });
            } else {
                res.status(401).send({ message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    getHistory: async (req, res) => {
        try {
            const submissions = await Submission.find({ userId: req.params.userId })
                .populate('contestId', 'name description startTime endTime')
                .sort('-submittedAt');

            res.send(submissions);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    },

    getVipPass: async (req, res) => {
        try {
            const userId = req.user._id.toString();

            // Payment gateyaw logic comes here
            const isPaymentSuccessful = true;

            if (!isPaymentSuccessful) {
                res.status(400).send({
                    message: "Payment failed"
                });
            }

            await User.updateOne({
                userType: USER_TYPE.VIP
            });

            res.status(201).send({
                message: "VIP access granted to user"
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Server error' });
        }
    }

}

export default UserController;
