const Query = require('./Query');
const Mutation = require('./Mutation');
const Book = require('./Book');

const resolvers = {
  Query,
  Mutation,
  Book,
};

module.exports = {resolvers};
