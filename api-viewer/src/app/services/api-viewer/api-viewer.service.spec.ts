import { TestBed } from '@angular/core/testing';

import { ApiViewerService } from './api-viewer.service';

describe('ApiViewerService', () => {
  let service: ApiViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
