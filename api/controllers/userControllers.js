import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

export const test = (req, res) => {
    res.json({
        message: "API is Working"
    })
}

//update User
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json("you van update only your account")
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10); 
        }

        const upadatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        
        const {password, ...rest} = upadatedUser._doc;
        res.status(200).json(rest)

    } catch (error) {
        return res.status(401).json("Error in Update")
    }
}