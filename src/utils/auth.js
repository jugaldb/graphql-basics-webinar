const JWT = require('jsonwebtoken')
require('dotenv').config()

const parseAuthToken = async ({ request, connection }) => {
  const AUTHORIZATION_HEADER_NAME = 'authorization';
  let authorization;
  if (connection) {
    authorization = connection.context[AUTHORIZATION_HEADER_NAME];
  } else {
    authorization = request.headers[AUTHORIZATION_HEADER_NAME];
  }
  if (authorization) {
    const tokenSplitBy = ' ';
    let token = authorization.split(tokenSplitBy);
      let accessToken = token[1];
      try {
        JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            console.log(
              `utility parseAuthToken decoded=${JSON.stringify(decoded)}`
            );
            let value = decoded
            console.log(value)
            return value;
          }
        })

      } catch (err) {
        // logger.log(level.error, `utility parseAuthToken err=${err}`);
        return null;
      }
    }
    return null;
};

module.exports = parseAuthToken