import express from 'express';
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
const router = express.Router();

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)

router.post('/register', UserController.userRegistration)
router.post('/login',UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', checkUserAuth, UserController.loggedUser)

export default router