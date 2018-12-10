const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context, info) {
  const userId = getUserId(context) // getUserId retrieves the user ID stored in the JWT that is set at the Authorization header of the incoming HTTP request
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }, // connect the new Link with the User that created it using the connect mutation
      },
    },
    info,
  )
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10) // encrypt password using bcryptjs library
  const user = await context.db.mutation.createUser({ // save user to database
    data: { ...args, password },
  }, `{ id }`)
  const token = jwt.sign({ userId: user.id }, APP_SECRET) // generate a JWT, signed with APP_SECRET

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `) // Get existing user info by specified email address. If no user found, throw error. If user found, return id and encrypted password
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password) // compare provided password with stored password
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)
  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId }
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }
  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    },
    info,
  )
}

module.exports = {
  signup,
  login,
  post,
  vote,
}
