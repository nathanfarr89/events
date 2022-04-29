const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const GameType = new GraphQLObjectType({
  name:  'GameType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    platform: { type: GraphQLString }
  })
});

module.exports = GameType;
