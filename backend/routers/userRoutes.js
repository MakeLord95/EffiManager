const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const tokenRefreshMiddleware = require("../middleware/tokenRefreshMiddleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for user management
 */

// Register a user
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully registered
 *       500:
 *         description: Failed to create user
 */
router.post("/register", userController.createUser);

// Log in a user
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", userController.loginUser);

// Update user information
/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully updated
 *       401:
 *         description: Not authorized, token failed
 *       500:
 *         description: Failed to update user
 */
router.put(
  "/update",
  authMiddleware,
  tokenRefreshMiddleware,
  userController.updateUser
);

// Delete a user
/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       401:
 *         description: Not authorized, token failed
 *       500:
 *         description: Failed to delete user
 */
router.delete(
  "/delete",
  authMiddleware,
  tokenRefreshMiddleware,
  userController.deleteUser
);

// Get user information
/**
 * @swagger
 * /user/get:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully retrieved
 *       401:
 *         description: Not authorized, token failed
 *       500:
 *         description: Failed to get user
 */
router.get(
  "/get",
  authMiddleware,
  tokenRefreshMiddleware,
  userController.getUser
);

// Get all users
/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users successfully retrieved
 *       500:
 *         description: Failed to get users
 */
router.get("/getAll", userController.getAllUsers);

module.exports = router;
