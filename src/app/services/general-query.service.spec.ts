import { TestBed } from '@angular/core/testing';

import { GeneralQueryService } from './general-query.service';

describe('GeneralQueryService', () => {
  let service: GeneralQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
