import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiViewerItemComponent } from './api-viewer-item.component';

describe('ApiViewerItemComponent', () => {
  let component: ApiViewerItemComponent;
  let fixture: ComponentFixture<ApiViewerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiViewerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiViewerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
