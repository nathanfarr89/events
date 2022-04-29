const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const GameType = require('./game_type');
const Game = mongoose.model('game');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    games: {
      type: new GraphQLList(GameType),
      resolve() {
        return Game.find({});
      }
    },
    game: {
      type: GameType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Game.findById(id);
      }
    },
  })
});

module.exports = RootQuery;
