const {ApolloServer, gql} = require("apollo-server-express")
const express = require("express")
const uuidV4 = require("uuid/v4")

const typeDefs = gql`
  type Doc {
    id: String!
    name: String!
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

const server = new ApolloServer({typeDefs, resolvers})

const app = express()
server.applyMiddleware({app})

const currentDate = new Date().toLocaleString()

app.get("/", (_, res) => {
  res.send(
    `see graphql at http://localhost:8080${server.graphqlPath} - refreshed on ${currentDate}`,
  )
})

app.listen({port: 8080}, () => console.log("Server ready at http://localhost:8080"))
