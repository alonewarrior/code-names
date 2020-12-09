import '../../common/util/index';
const pluralize = require('pluralize');
const uuid = require('uuid/v4');

export function areRelated(model, relatedModelName: string): boolean {
    relatedModelName = relatedModelName.toSnakeCase();
    const pluralRelatedModelName = pluralize(relatedModelName);
    return model.associations.hasOwnProperty(relatedModelName) || model.associations.hasOwnProperty(pluralRelatedModelName);
}

export function createId() {
    const id = uuid();
    const temp = id.replace(/-/g, '');
    const shortenedId = id.replace(/-/g, '').slice(0, -16);
    return shortenedId;
}
