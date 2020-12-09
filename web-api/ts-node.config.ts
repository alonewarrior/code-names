import * as tsnode from 'ts-node';

tsnode.register({
    project: 'tsconfig.spec.json',
    files: true,
    transpileOnly: true,
    typeCheck: true
});
