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
