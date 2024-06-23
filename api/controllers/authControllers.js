import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js"


export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashPassword = bcryptjs.hashSync(password, 10) //it convert the password into hashcode and make it hard
    try {
        await User.create({ // it creates new user and simultaniously saves the data to database also
            username,
            email,
            password: hashPassword,
        });
        res.status(201).json({ message: "User created Successfully" });
    } catch (err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return res.status(404).json({ message: "User not Found" });
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return res.status(401).json({ message: "wronge Credentials" });
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        const { password: hashPassword, ...rest } = validUser._doc

        res.cookie('access_token1', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (err) {
        next(err)
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: hashPassword, ...rest } = user._doc
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token1', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
        }
        else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, profilePhoto: req.body.photo
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}
