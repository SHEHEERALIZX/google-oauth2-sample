const passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '43891894090-gc5l9mq97cjd7qccebseaqtmp078gscu.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://oauth2-passportjs.herokuapp.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})