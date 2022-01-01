var express = require('express');
var router = express.Router();
const passport = require('passport')
require('../auth')

const verifyLogin = (req,res,next)=>{
  console.log(req.user);
  req.user ? next() : res.send(401)
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('<a href="/auth/google">Authenticate with google</a>')
});


router.get('/protected', verifyLogin, function (req, res, next) {
  res.send(`Hello ${req.user.displayName} <a href="/logout">Logout</a>`)
});

router.get('/google/callback',
  passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'
  })
);





router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);


router.get('/auth/failure', (req, res) => {
  const obj = {
    name: "You",
    msg: "Try again you fool"
  }
  res.send(obj).json
}

);



router.get('/logout', function (req, res, next) {
  req.logout()
  req.session.destroy()
  res.redirect('/')
});
module.exports = router;
