  const { AuthenticationError } = require('apollo-server-express');
const { User  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
   me: async (parent, args, context) => {
    const foundUser = await User.findOne({
        $or: [{ _id: context.user ? context.user._id : args.id }, { username: args.username }],
    });
  
    if (!foundUser) {
        throw new AuthenticationError('Not logged in');
    }

    return foundUser;
    }
},
   Mutation: {
       addUser: async(parent, args) => {
           const user = await User.create(args);
           const token = signToken(user);

           return{ token, user };
       },
       login: async (parent, {username, email, password}) => {
        const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (!user) {
            throw new AuthenticationError('Incorrect credentials');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
       },
       saveBook: async (parent, args, context) => {
        if(context.user) {
            
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: args } },
              { new: true, runValidators: true }
            );

            return updatedUser;
        }
          
        throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (parent, {bookId}, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
        ).populate('savedBooks');

        if (!updatedUser) {
            throw new AuthenticationError("Couldn't find user with this id!");
        }
        return updatedUser;
    }
   }
}

module.exports = resolvers;