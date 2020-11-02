const { decode } = require('jsonwebtoken');
const User = require('../../models/user');
const parseAuthToken = require('../../utils/auth')

const user = new User();

const getCurrentUser = async (request, connection) => {
  let userData;
  let decoded = await parseAuthToken({ request, connection });
  console.log('asdadscscwce',decoded)
  if (decoded) {
    console.log('decoded', decoded)
    let email = decoded.email;
    [userData] = await user.get({ email });
  }
  console.log('asdasd',userData)
  return userData;
};

const context = async ({ request, connection }) => ({
  request,
  connection,
  user,
  currentUser: await getCurrentUser(request, connection),
});

module.exports = {context};
