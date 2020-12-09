import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ApiViewerComponent} from './api-viewer/api-viewer.component';
import {ApiViewerSetComponent} from './api-viewer/api-viewer-set/api-viewer-set.component';
import { ApiViewerItemComponent } from './api-viewer/api-viewer-item/api-viewer-item.component';

@NgModule({
    declarations: [
        AppComponent,
        ApiViewerComponent,
        ApiViewerSetComponent,
        ApiViewerItemComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
