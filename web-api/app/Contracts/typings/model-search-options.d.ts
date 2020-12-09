import {IFindOptions, Model} from 'sequelize-typescript';
import {AggregateOptions} from 'sequelize';
import {ICountOptions} from 'sequelize-typescript/lib/interfaces/ICountOptions';

export type ModelSearchOptions<T extends Model<T>> =
    FindAll<T>
    | FindOne<T>
    | FindById<T>
    | Aggregate
    | Count<T>
    | Max
    | Min
    | Sum;

export type FindAll<T extends Model<T>> = [IFindOptions<T>];

export type FindOne<T extends Model<T>> = FindAll<T>;

export type FindById<T extends Model<T>> = [number | string] | [number | string, IFindOptions<T>];

export type Aggregate = [string, string] | [string, string, AggregateOptions];

export type Count<T extends Model<T>> = [ICountOptions<T>];

export type Max = [string] | [string | AggregateOptions];

export type Min = Max;

export type Sum = Max;
