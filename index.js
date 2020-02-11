const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const Apps = require('./db')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({apps: Apps})
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});