const {SUPPORTED_VARIANTS} = require('../constants')
const { createTestClient } = require('apollo-server-testing')
const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('../schema')
const resolvers = require('../resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => (
        {
            apps: [
                {
                    id: '1',
                    icon: 'https://p1.hiclipart.com/preview/379/165/122/deus-ex-mankind-divided-dock-icon-png-clipart-thumbnail.jpg',
                    name: 'Deus Ex',
                    headline: 'I never asked for this',
                    description: 'Adam Jensen is back!!! Uncover the truth about Sarif Industries',
                    installed: true
                }
            ]
    })
});
const { query } = createTestClient(server)

const GET_VARIANT = gql`
    {
        variant
    }
`

describe('apps', () => {
    const GET_APPS = gql`
        {
            apps {
                id
                icon
                name
                headline
                description
            }
        }
    `

    test('it returns the list of apps in the db in the appropriate format', async () => {
        const res = await query({query: GET_APPS})
        expect(res.data).not.toBe(undefined)
        expect(res.data.apps).toMatchSnapshot()
    })
});

describe('app', () => {
    const GET_APP = gql`
        query app($id: ID!) {
            app(id: $id) {
                id
                icon
                name
                headline
                description
                installed
            }
        }
    `

    test('it returns a specific app from the db', async () => {
        const res = await query({query: GET_APP, variables: {id: 1}})
        expect(res.data).not.toBeUndefined()
        expect(res.data.app).toEqual({
            id: '1',
            icon: 'https://p1.hiclipart.com/preview/379/165/122/deus-ex-mankind-divided-dock-icon-png-clipart-thumbnail.jpg',
            name: 'Deus Ex',
            headline: 'I never asked for this',
            description: 'Adam Jensen is back!!! Uncover the truth about Sarif Industries',
            installed: true
        })
    })

    test('it returns null if no such app exists in the db', async () => {
        const res = await query({query: GET_APP, variables: {id: 999}})

        expect(res.data).toBeNull()
    })
});

test('it returns a variant from amongst supported variants', async () => {
    const res = await query({query: GET_VARIANT})
    expect(res.data).not.toBe(undefined)
    expect(SUPPORTED_VARIANTS).toContain(res.data.variant)
})