module.exports=function(app){
    var userhandlers=require('../controllers/userController.js')

    app.route('/profile')
    .post(userhandlers.loginRequired,userhandlers.profile);

    app.route('/auth/register')
    .post(userhandlers.register);

    app.route('/auth/sign_in')
    .post(userhandlers.sign_in);
}