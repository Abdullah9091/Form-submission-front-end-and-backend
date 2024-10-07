const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle form submission
router.post('/submit', userController.submitUser);

// Route to get all users
router.get('/show', userController.getAllUsers);

router.delete('/delete/:id', userController.deleteUser);

router.put('/update/:id', userController.updateUser);

router.post('/login/:id', userController.loginUser);


module.exports = router;
