import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Resource} from '../../shared/models/resource';

@Injectable({
    providedIn: 'root'
})
export class ApiViewerService {

    constructor(private _http: HttpClient) {
    }

    getApiResources(): Observable<Resource[]> {
        return this._http.get<any[]>('/api/apiViewer/resources');
    }

}
