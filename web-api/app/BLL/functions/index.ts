import {BaseModel} from '../../common/base/base-model';

export function getCreateIncludeFields<T extends typeof BaseModel>(exclude: string[], current: T) {
    let attributes = Object.keys(current.attributes);
    return stringDifference(attributes, exclude);
}

export function getUpdateIncludeFields<T extends BaseModel<T>>(exclude: string[], current: T) {
    let attributes = Object.keys(current.dataValues);
    return stringDifference(attributes, exclude);
}

export function stringDifference(first: string[], second: string[]): string[] {
    return first.filter((attr) => {
        return !second.find(ex => ex === attr);
    });
}
