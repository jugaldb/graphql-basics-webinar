const DBOperation = require('../services/database_operation');
const mongoose = require('mongoose')

// mongoose schema
const schema = {
  _id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		trim: true,
	},
	name: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
  },
  phone_number: {
    type: Number,
    trim: true,
  },
};
let UserModel = DBOperation.createModel('User', schema);
class User {
	async add(user) {
		return new Promise((resolve, reject) => {
			try {
				const addedUser = Promise.resolve(
					DBOperation.create(UserModel, user)
				);
				resolve(addedUser);
			} catch (err) {
				reject(err);
			}
		});
	}
	async get(filter, option) {
		return new Promise((resolve, reject) => {
			try {
				const user = Promise.resolve(
					DBOperation.get(UserModel, filter, option)
				);
				resolve(user);
			} catch (err) {
				reject(err);
			}
		});
	}
	async update(filter, updatedField) {
		return new Promise((resolve, reject) => {
			try {
				const updatedUser = Promise.resolve(
					DBOperation.update(UserModel, filter, updatedField)
				);
				resolve(updatedUser);
			} catch (err) {
				reject(err);
			}
		});
	}
	async delete(filter) {
		return new Promise((resolve, reject) => {
			try {
				const deletedUser = Promise.resolve(
					DBOperation.delete(UserModel, filter)
				);
				resolve(deletedUser);
			} catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = User;
