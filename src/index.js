const {ApolloServer, gql} = require("apollo-server-express")
const express = require("express")
const uuidV4 = require("uuid/v4")

const typeDefs = gql`
  type Doc {
    id: String!
    name: String!
  }

  type Query {
    dummy: String
  }

  type Mutation {
    createDoc(name: String!): Doc!
  }
`
const resolvers = {
  Query: {},
  Mutation: {
    createDoc: (_, {name}) => {
      return {id: uuidV4(), name}
    },
  },
}

const server = new ApolloServer({typeDefs, resolvers, playground: true})

const app = express()
server.applyMiddleware({app})

const currentDate = new Date().toLocaleString()

const port = process.env.PORT || 8080

app.get("/", (_, res) => {
  res.send(
    `see graphql at http://localhost:${port}${server.graphqlPath} - refreshed on ${currentDate}`,
  )
})

app.get("/test", (_, res) => {
  res.send("xxx")
})

app.listen({port}, () => console.log(`Server ready at http://localhost:${port}`))
