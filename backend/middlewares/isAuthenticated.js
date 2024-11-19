import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        console.log("Token from cookies:", token); // Debugging to check token value

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please log in.",
                success: false
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expired",
                success: false
            });
        }

        res.status(500).json({
            message: "An error occurred during authentication",
            success: false
        });
    }
};

export default isAuthenticated;
