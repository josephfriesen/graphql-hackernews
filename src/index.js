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
    "url": "https://www.howtographql.com",
    "description": "a webbed site"
  }
];

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      const theLinkIAmLookingFor = links.find(link => link.id === args.id);
      return theLinkIAmLookingFor;
    }
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

    updateLink: (root, args) => {
      const newLink = {id: args.id, url: args.url, description: args.description};
      links.forEach(link => {
        if (link.id === newLink.id) {
          link.id = args.id;
          link.url = args.url;
          link.description = args.description;
        }
      });
      return newLink;
    },

    deleteLink: (root, args) => {
      const badLinkIndex = links.findIndex(item => item.id === args.id);
      const badLink = links[badLinkIndex];
      links.splice(badLinkIndex,1);
      console.log(links);
      return badLink;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log('Server is running on http://localhost:4000'));
