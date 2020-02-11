module.exports = {
    Query: {
        apps: (_,__,{dataSources}) => dataSources.apps,
        app: (_, {id}, {dataSources}) => {
            return dataSources.apps.find(app => app.id === id)
        },

        variant: () => 'A'
    }
}
