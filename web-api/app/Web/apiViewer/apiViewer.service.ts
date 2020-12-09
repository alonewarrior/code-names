import {Injectable} from '../../common/util/decorators/iocDecorators/injectable';
import {getResources, Resource} from './apiViewer.functions';

@Injectable('ApiViewerService')
export class ApiViewerService {
    constructor() {
    }

    getResources(): Resource[] {
        return getResources('DAL', '**/*.apiconfig.json', '/api');
    }

}
