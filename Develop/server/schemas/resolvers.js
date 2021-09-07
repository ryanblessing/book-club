  
const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
   me: async(parent, args, context) => {
       if(context.user) {
           const userData = await User.findOne({_id: context.user._id})
           .select('-__v -password')
           .populate('books')
           return userData;
       }
       throw new AuthenticationError('Not logged in')
   },

   //get all users
   users: async () => {
       return User.find()
       .select('-__v -password')
       .populate('books')
   },

   //get a user by username
   user: async(parent, { username }) => {
       return User.findOne({ username })
       .select('-__v -password')
       .populate('books')
   },
   //find by title?
   books: async(parent, {title}) => {
       const params = title ? {title} : {};
       return Book.find(params).sort({ author: -1 })
   },

   //find one book?
   book: async(parent, { bookId }) => {
       return Book.findOne({ bookId })
   },
   
   Mutation: {
       addUser: async(parent, args) => {
           const user = await User.create(args);
           const token = signToken(user);

           return{ token, user };
       },
       login: async(parent, { email, password}) => {
           const user = await User.findOne({ email });

           if(!user) {
               throw new AuthenticationError('incorrect email')
           }

           const correctPW = await user.isCorrectPassword(password);

           if(!correctPW) {
               throw new AuthenticationError('incorrect password!')
           }

           const token = signToken(user);
           return { token, user}
       },
       saveBook: async(parent, { bookId }, context) => {
           if (context.user) {
               const updateUser = await User.findOneAndUpdate(
                   { _Id: context.user._id },
                   { $addToSet: { books: bookId } },
                   { new: true }
               ).populate('books')

               return updateUser
           }
           throw new AuthenticationError('user needs to be logged in')
       },

       removeBook: async(parent, { bookId }, context) => {
           if(context.user) {
               const updateUser = await User.findOneAndDelete(
                { _id: context.user._id },
                { $addToSet: { books: bookId } },
                { new: true }
               ).populate('books')
               return updatedUser;
           }
           throw new AuthenticationError('user needs to be logged in')
       }
   }
}
}

module.exports = resolvers;