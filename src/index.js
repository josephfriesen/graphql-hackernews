const { GraphQLServer } = require('graphql-yoga');
const v4 = require('uuid/v4');

let links = [
  {
    "id": "1",
    "url": "https://www.website.cool",
    "description": "a hot link"
  },
  {
    "id": "2",
    "url": "https://www.howtographql",
    "description": "a webbed site"
  }
];

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (args) => { return links.filter(link => link.id === args.id) }
  },
  Mutation: {
    post: (root, args) => {
       const link = {
        id: v4(),
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link // return link as specified in schema Mutation.post(): Link!
    },

    // updateLink: (root, args) => {
    //
    // }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log('Server is running on http://localhost:4000'));
