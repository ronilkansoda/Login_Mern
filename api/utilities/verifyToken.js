import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    console.log("Cookies: ", req.cookies.access_token1); // Debugging line
    const token = req.cookies.access_token1; 

    if (!token) return res.status(401).json("You need to Login");
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token is not valid");

        req.user = user;
        next();
    });
}