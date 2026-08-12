import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.MYJWTSECRETEKEY;

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    

    req.user = decoded;

    next();
  } catch (error) {
    

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

export const playerOnly = (req, res, next) => {
  if (req.user.role !== "player") {
    return res.status(403).json({
      success: false,
      message: "Player access required",
    });
  }

  next();
};