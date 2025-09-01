import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Protect routes - verify JWT token
export const protect = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Add user info to request
      req.user = decoded;
      next();
      
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false, 
          message: "Token expired. Please login again." 
        });
      }
      
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token." 
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error in authentication." 
    });
  }
};

// Role-based middleware
export const roleMiddleware = (roles) => (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required." 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden: Insufficient privileges." 
      });
    }

    next();
    
  } catch (error) {
    console.error('Role middleware error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error in role verification." 
    });
  }
};

// Admin only middleware
export const adminOnly = (req, res, next) => {
  roleMiddleware(['admin'])(req, res, next);
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
      } catch (error) {
        // Token is invalid, but we continue without authentication
        req.user = null;
      }
    } else {
      req.user = null;
    }
    
    next();
    
  } catch (error) {
    req.user = null;
    next();
  }
};
