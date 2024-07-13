import User from "../models/user.models.js"

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                sucess: false,
                message: "User already exists"
            })
        }
        user = await User.create({
            username,
            email,
            password
        });
        const token = await user.generateToken();
        console.log("Registered successfully");
        res.status(200).cookie("token", token).json({
            sucess: true,
            user,
            token,
            message:"Registered successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "User does not exist"
            })
        }
        const isMatch = await user.matchPassword(password);
        const token = await user.generateToken();
        if (!isMatch) {
            return res.status(400).json({
                sucess: false,
                message: "Incorrect Password"
            })
        }
        console.log("Logged in successful");
        res.status(200).cookie("token", token).json({
            success: true,
            user,
            token
        })
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            message: err.message
        })
    }
}



export { register, login }