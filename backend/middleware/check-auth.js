const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // header looks like this so have to split to get space out and create array from which to access token Authorization: 'Bearer Token'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // validating token
    req.userData = {
      userId: decodedToken.userId,
    }; // adding data to the request object that continues with the req to the rest of the endpoints
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
