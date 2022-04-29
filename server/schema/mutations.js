const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Game = mongoose.model('game');
const GameType = require('./game_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addGame: {
      type: GameType,
      args: {
        title: { type: GraphQLString },
        releaseDate: { type: GraphQLString },
        platform: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Game({ title })).save()
      }
    },
    deleteGame: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Game.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
