export interface IDocument {
    jsonapi?: IJsonApi;
    meta?: object;
    errors?: IError[];
    data?: IResource | IResource[];
    included?: IResource[];
    links?: any;
}

export interface IResource {
    type?: string;
    id?: string | number;
    links?: ILinks;
    relationships?: {[type: string]: IRelationship};

    attributes?: object;
    meta?: object;
}

export interface IRelationship {
    data?: {
        type?: string;
        id?: string | number;
    };
    links?: ILinks;
}

export interface IError {
    id?: string | number;
    status?: number;
    title?: string;
    detail?: string;

    source?: object;
    meta?: object;
    links?: object;

    code?: any;
}

export interface ILinks {
    self?: string;
    href?: string;

    related?: IRelated | string;

    meta?: object;
}

export interface IRelated {
    href?: string;
    meta?: object;
}

export interface IJsonApi {
    version?: string;
}
