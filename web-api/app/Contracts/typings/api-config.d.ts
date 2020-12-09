declare interface ApiConfig {
    model: string,
    public: boolean,
    findById: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        accessLevel: string[]
    },
    findAll: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        accessLevel: string[]
    },
    findRelations: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        accessLevel: string[]
    },
    findSingleRelation: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        accessLevel: string[]
    },
    create: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        requireAuth?: boolean,
        accessLevel: string[]
    },
    update: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        requireAuth?: boolean,
        accessLevel: string[]
    },
    delete: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        requireAuth?: boolean,
        accessLevel: string[]
    },

}

export interface Config {
    [key: string]: {
        middleware: {
            "pre-auth": string[],
            "post-auth": string[],
            "post-resource": string[]
        },
        enabled: boolean,
        requireAuth: boolean,
        accessLevel: string[]
    };
}
