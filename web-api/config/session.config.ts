module.exports.session = function(app, User) {
    //var session = require('express-session');
    //var flash = require('connect-flash');
    let passport = app.get('passport');

    /**
     * SETS SESSION CONFIGURATION FOR APPLICATION
     */
    var sessionConfig = {
        testing:"hello",
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    };
    
    /**
     * CONFIGURES AND USES SESSIONS
     * THIS SHOULD BE IGNORED IN MOST CIRCUMSTANCES
     */
    //app.use(session(sessionConfig));
    //app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    console.info("Sessions configured and initialized");
    
    /**
     * USER SESSION SERIALIZE AND DESERIALIZE METHOD DEFINITIONS
     */
    // Serialize
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });
    
    // Deserialize
    passport.deserializeUser(function(id, done) {
        User.findByPrimary(id).then(function(user) {
            return done(null, user);
        });
    });    
};
