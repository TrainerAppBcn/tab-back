const createError = require('http-errors');
// token confirmation (google login)
// const { OAuth2Client } = require('google-auth-library');
// const { token } = require('morgan');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleAuth = async (token) => {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.GOOGLE_CLIENT_ID
//   });
//   const payload = ticket.getPayLoad();
//   console.log(`User ${payload.name} verified`);

//   const { sub, email, name, picture } = payload;
//   const userId = sub;
//   return { userId, email, fullName: name, photoUrl: picture };
// };

// module.exports = googleAuth;

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) next(createError(400));
  else next();
}
