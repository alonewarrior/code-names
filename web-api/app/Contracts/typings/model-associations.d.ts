import {Model} from 'sequelize-typescript';

declare interface ModelAssocations<Mod extends typeof Model, Assoc extends typeof Model> {
    source: Mod;
    target: Assoc;
    options: object;
    scope: any;
    isSelfAssociation: boolean;
    as: string;
    associationType: string;
    isSingleAssociation: boolean;
    foreignKeyAttribute: object;
    foreignKey: string;
    identifier: string;
    identifierField: string;
    targetKey: string;
    targetKeyField: string;
    targetKeyIsPrimary: boolean;
    targetIdentifier: string;
    associationAccessor: string;
    accessors: {
        get: string,
        set: string,
        create: string
    }
}
