import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApiViewerSetComponent} from './api-viewer-set.component';

describe('ApiViewerSetComponent', () => {
    let component: ApiViewerSetComponent;
    let fixture: ComponentFixture<ApiViewerSetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApiViewerSetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApiViewerSetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
