import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ApiViewerService} from '../services/api-viewer/api-viewer.service';
import {Resource} from '../shared/models/resource';

interface ResourceMapping {
    [key: string]: Resource[];
}

@Component({
    selector: 'app-api-viewer',
    templateUrl: './api-viewer.component.html',
    styleUrls: ['./api-viewer.component.scss']
})
export class ApiViewerComponent implements OnInit {

    private _filter$: BehaviorSubject<any>;
    resources$: Observable<[string, Resource[]][]>;

    constructor(private _apiViewerService: ApiViewerService) {
    }

    ngOnInit(): void {
        this._filter$ = new BehaviorSubject<any>(null);
        const resources$ = this._apiViewerService.getApiResources()
            .pipe(
                map((resources) => {
                    const temp: ResourceMapping = {};
                    resources.forEach(x => {
                        if (!temp[x.name]) {
                            temp[x.name] = [];
                        }
                        temp[x.name].push(x);
                    });
                    return Object.entries(temp)
                        .map((entry) => entry);
                })
            );
        this.resources$ = combineLatest([resources$, this._filter$])
            .pipe(map((vals) => vals[0]));
    }
}
