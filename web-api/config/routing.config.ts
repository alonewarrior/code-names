module.exports = {
    modelDirectory: __dirname + '/../app/DAL/models/',
    resourceDirectory: __dirname + '/../app/Web/resources/',
    resourceExt: '.resource.js',
    altResourceExt: '.resource.ts',
    configExt: '.apiconfig.json',
    roles: {
        /**
         * Roles define a type and their identification in the _database. Those with a higher number have a lower access
         * level to data. Those with a lower number will have a higher access level to data.
         */
        admin: 1,
        standard: 2,
        thirdParty: 3,
        guest: 4,
    },
    specialFiles: ["model"]
};
