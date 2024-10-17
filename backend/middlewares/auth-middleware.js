import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { JWT_SECRET_KEY } from '../config/connectdb.js'; // Ensure this is properly imported

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  // Check if authorization header exists and is properly formatted
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = authorization.split(' ')[1];

      // Verify the token using the secret key
      const { userID } = jwt.verify(token, JWT_SECRET_KEY);

      // Retrieve the user by ID (exclude password field)
      req.user = await UserModel.findById(userID).select('-password');

      if (!req.user) {
        return res.status(401).send({ "status": "failed", "message": "Unauthorized User, User Not Found" });
      }

      // Proceed to the next middleware or controller
      next();
    } catch (error) {
      console.log('Error verifying token:', error);
      return res.status(401).send({ "status": "failed", "message": "Unauthorized User, Invalid Token" });
    }
  } else {
    return res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;