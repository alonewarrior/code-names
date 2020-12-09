import * as glob from 'glob';
import * as path from 'path';

export interface Resource {
    name: string;
    isPublic: boolean;
    isModelBased: boolean;
    resourceKey: string;
    isEnabled: boolean;
    filePath: string;
    uri: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    middleware: {
        preAuth: string[],
        postAuth: string[],
        postResource: string[]
    };
    accessLevel: string[];
    isAuthRequired: boolean;
}

const keysToIgnore = ['model', 'name', 'public', '$schema'];

export function getResources(modelBasedInclude: string, resourcePattern: string, prefix: string): Resource[] {
    const resourceObject = getResourceFiles(resourcePattern);
    const list = [];
    resourceObject.forEach(x => {
        const isModelBased = x.path.includes(modelBasedInclude);
        list.push(...mapResourceFile(x, isModelBased, prefix));
    });
    return list;
}

export function getResourceFiles(pattern: string): { path: string, resourceFile: object }[] {
    return glob.sync(pattern)
        .map(x => ({path: x, resourceFile: require(path.join(process.cwd(), x))}));
}

export function mapResourceFile(resourcePathObj: { path: string, resourceFile: any },
                                isModelBased: boolean,
                                prefix: string): Resource[] {
    const resourceFile = resourcePathObj.resourceFile;
    const keys = Object.keys(resourceFile)
        .filter(key => !keysToIgnore.includes(key));
    if (isModelBased) {
        return keys
            .map((key) => {
                [resourceFile[key].uri, resourceFile[key].method] = getModelBasedResourceUriAndMethod(key);
                return mapResource(key, resourcePathObj.path, prefix, resourceFile, true);
            });
    }
    return keys
        .map((key) => mapResource(key, resourcePathObj.path, prefix, resourceFile));
}

export function getModelBasedResourceUriAndMethod(key: string): [string, string] {
    switch (key) {
        case 'findById':
            return [':id', 'GET'];
        case 'findAll':
            return [null, 'GET'];
        case 'findRelations':
            return [':id/:relation', 'GET'];
        case 'findSingleRelation':
            return [':id/:relation/:relationId', 'GET'];
        case 'create':
            return [null, 'POST'];
        case 'update':
            return [':id', 'PATCH'];
        case 'delete':
            return [':id', 'DELETE'];
    }
}

export function mapResource(key: string, filePath: string, prefix: string, resourceObj: any, isModelBased = false): Resource {
    const resource = resourceObj[key];
    const name = resourceObj.model || resourceObj.name;
    const uri = resource.uri ? `${prefix}/${name}/${resource.uri}` : `${prefix}/${name}`;
    console.log('resource', resource);
    return {
        name: name,
        isPublic: resourceObj.public,
        isModelBased,
        resourceKey: key,
        isEnabled: resource.enabled,
        uri,
        method: resource.method,
        middleware: {
            preAuth: [...resource.middleware['pre-auth']],
            postAuth: [...resource.middleware['post-auth']],
            postResource: [...resource.middleware['post-resource']]
        },
        accessLevel: resource.accessLevel,
        isAuthRequired: resource.requireAuth || false,
        filePath
    };
}
