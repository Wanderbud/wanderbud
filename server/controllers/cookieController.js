const cookieController = {};

// Set General Cookie for Site
// cookieController.setCookie = (req, res, next) => {
//   res.cookie('wanderbud', Math.floor(Math.random() * (1000)),  {httpOnly: true});
//   next();
// }

// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('wanderbudSSID', res.locals.userData.id, {httpOnly: true});
  next();
}

module.exports = cookieController;