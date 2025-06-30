
const express = require('express') ; 
const { signup, login, getLoggedInUserDetails } = require('../controllers/authController');
const { verifyJWT } = require('../middlewares/authMiddleware');

const router = express.Router() ;

router.post('/signup' , signup) ; 
router.post('/login' , login) ; 
router.get('/userdetails' , verifyJWT ,  getLoggedInUserDetails) ;

module.exports = router ;