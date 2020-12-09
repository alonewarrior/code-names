import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../shared/models/resource';

@Component({
    selector: 'app-api-viewer-set',
    templateUrl: './api-viewer-set.component.html',
    styleUrls: ['./api-viewer-set.component.scss']
})
export class ApiViewerSetComponent implements OnInit {
    @Input() name: string;
    @Input() resources: Resource[];

    shouldDisplay = false;


    constructor() {
    }

    ngOnInit(): void {
    }

    toggleDisplay() {
        this.shouldDisplay = !this.shouldDisplay;
    }

}
