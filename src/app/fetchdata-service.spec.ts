import { TestBed } from '@angular/core/testing';

import { FetchdataService } from './fetchdata-service';

describe('FetchdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchdataServiceService = TestBed.get(FetchdataService);
    expect(service).toBeTruthy();
  });
});
