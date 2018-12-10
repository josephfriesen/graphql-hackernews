async function feed(parent, args, context, info) {
  // filter links by filter argument provided in query
  const where = args.filter
    ? {
        OR: [
          { url_contains: args.filter },
          { description_contains: args.filter },
        ],
      }
    : {}

  // get number of links based on filtering, ordering and pagination (skip, first) arguments. Hardcoded to only return the selection set with the single value 'id', as this variable is just used by the function and only needs access to the id of each link.
  const queriedLinks = await context.db.query.links(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    `{ id }`,
  )

  // linksConnection is a query from the Prisma database schema, used to get the number of link elements currently in the database.
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const linksConnection = await context.db.query.linksConnection({}, countSelectionSet)

  // linkIds will be passed to the Feed resolver
  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id),
  }
}

module.exports = {
  feed,
}
