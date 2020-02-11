const { gql } = require('apollo-server')

const typedefs = gql`
    enum Variant {
        A
        B
    }

    type App {
        id: ID!
        icon: String!
        name: String!
        headline: String
        description: String
        installed: Boolean!
    }
    
    type Query {
        apps: [App]
        app(id: ID!): App!
        
        variant: Variant!
    }
`

module.exports = typedefs
