import {Model} from 'sequelize-typescript/lib/models/Model';



// @ts-ignore
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

// @ts-ignore
type FilteredModelAttributes<T extends Model<T>> =
    RecursivePartial<Omit<T, keyof Model<any>>> & {
    id?: number | any;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    deletedAt?: Date | any;
    version?: number | any;
    add_user_id?: number | any;
    change_user_id?: number | any;
};



export interface DatabaseReplicationConfig {
    type: 'read' | 'write';
    ssl: boolean;
    host: string;
    port: number;
    username: string;
    password: string;
    ca: string;
    cert: string;
    key: string;
}

export interface DatabaseConfig {
    databaseName: string;
    username: string;
    password: string;
    underscored: boolean;
    logging: boolean;
    pool: {
        max: number;
        min: number;
        idle: number;
    };
    configs: DatabaseReplicationConfig[];
}

export interface DatabaseOptionsReplication {
    read: Replication[];
    write: Replication[];
}

export interface Replication {
    host: string;
    port: number;
    username: string;
    password: string;
    ssl: {
        ca: string;
        cert: string;
        key: string;
    };
}

