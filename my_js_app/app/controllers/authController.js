// /controllers/authController.js
const authService = require('../services/authService');

exports.getLoginPage = (req, res) => {
  console.log("try login");
  const user = authService.getUserDetails(req);
  if (user) {
    //console.log(user);
    req.session.user = user;
    res.redirect('/');
  } else {
    res.status(401).send('Unauthorized');
  }
  console.log("success login");
};

exports.getLogoutPage = (req, res) => {
  console.log("try logout");
  let idToken = req.kauth?.grant?.id_token?.token;
  req.session.destroy((err) => {
    if (err) console.error(err);
    let logoutUrl = 'http://localhost:8080/realms/MyApp/protocol/openid-connect/logout';
    logoutUrl += '?post_logout_redirect_uri=' + encodeURIComponent('http://localhost:3000/');
    if (idToken) {
      logoutUrl += '&id_token_hint=' + encodeURIComponent(idToken);
    }
    res.redirect(logoutUrl);
  });
  console.log("success logout");
};

