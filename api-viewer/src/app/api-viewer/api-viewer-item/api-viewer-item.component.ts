import {Component, Input, OnInit} from '@angular/core';
import {Resource} from '../../shared/models/resource';

@Component({
    selector: 'app-api-viewer-item',
    templateUrl: './api-viewer-item.component.html',
    styleUrls: ['./api-viewer-item.component.scss']
})
export class ApiViewerItemComponent implements OnInit {
    @Input() resource: Resource;

    shouldDisplay = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleDisplay() {
        this.shouldDisplay = !this.shouldDisplay;
    }

}
