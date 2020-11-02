const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const Query = {
	getUsers: async (_parent, args, { user }) => {
    try {
      const users = await user.get({})
      console.log(users)
      return users
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  },
  getMe: async ( _parent, _args, { currentUser }) => {
    console.log('currentUser', currentUser)
    return currentUser ? currentUser : 'User not found'
  },
	userLogin: async (_parent, args, { user }) => {
    try {
      const [userFound] = await user.get({ email: args.email, password: args.password })
      if(!userFound){
        console.log('Authorization failed')
        throw Error('Incorrect email or password')
      }
      else {
        const token = JWT.sign(
          {
            id: userFound._id,
            email: userFound.email,
            phone_number: userFound.phone_number ? userFound.phone_number : '',
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ); 
        userFound.token = token
        console.log(`userFound = ${userFound}`)
      }
      return userFound
    } catch (e) {
      console.log(e)
      throw Error(e)
    }
  },
};

const Mutation = {
	createUser: async (_parent, args, { user }, _info) => {
    try {
      const userExists = await user.get({ email: args.userDoc.email })
      if(userExists.length >= 1) {
        console.log(userExists)
        throw Error(`Account with email ${userExists[0].email} already exists.`)
      }
      bcrypt.hash(args.userDoc.password, 10, async (err, hash) => {
        if(err) {
          console.log(err)
        }
        console.log(hash)
        args.userDoc.password = hash
      });
      const addedUser = await user.add(args.userDoc)
      console.log(addedUser)
      return addedUser
    } catch (e)	{
      console.log(e)
      throw Error(e)
    }
  }
};
module.exports = {
  UserQuery: Query,
  UserMutation: Mutation
};
