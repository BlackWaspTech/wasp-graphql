/*
  Example schema provided by the `graphql-tools` documentation
  https://www.apollographql.com/docs/graphql-tools/mocking.html
  https://launchpad.graphql.com/98lq7vz8r?_ga=2.255739272.1442119442.1539356849-2010884395.1537977562
*/

const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools');

// Construct a schema the usual way, using GraphQL schema language
// This already contains all the information we need to create mocks
// of the correct types for any query.
const typeDefs = `
  type User {
    id: Int
    name: String
    posts(limit: Int): [Post]
  }

  type Post {
    id: Int
    title: String
    views: Int
    author: User
  }

  type Query {
    aString: String
    aBoolean: Boolean
    anInt: Int
    author(id: Int): User
    topPosts(limit: Int): [Post]
  }
`;

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
};

// This function call adds the mocks to your schema!
addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
