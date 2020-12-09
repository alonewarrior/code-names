import {IIncludeOptions} from 'sequelize-typescript';
import {ModelDictionary} from '../../types';

export function flattenNestedIncludes(input: IIncludeOptions[]): IIncludeOptions[] {
    return input.reduce(flattenReducer, []);
}

function flattenReducer(acc: IIncludeOptions[], curr: IIncludeOptions, index, arr): IIncludeOptions[] {
    if (!!curr.include) {
        acc = curr.include.reduce(flattenReducer, [...acc]);
    }
    return [...acc, curr];
}

export function addIncludes(includes: IIncludeOptions[], modelDictionary: ModelDictionary): (acc, curr, index, arr) => any {
    const flattenedIncludes = flattenNestedIncludes(includes);
    return (acc, curr) => {
        const tempModel = modelDictionary[curr];
        if (!flattenedIncludes.find(fi => fi.model === tempModel)) {
            const temp = {model: modelDictionary[curr]};
            if (acc === null) {
                includes.push(temp);
            }
            flattenedIncludes.push(temp);
            const tempPreviousModel = modelDictionary[acc];
            let previousInclude = flattenedIncludes.find(x => x.model === tempPreviousModel);
            if (previousInclude && tempPreviousModel) {
                previousInclude.include = previousInclude.include ? [...previousInclude.include, temp] : [temp];
            }

        }
        return curr;
    };
}
