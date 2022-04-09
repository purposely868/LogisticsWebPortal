import { TestBed } from '@angular/core/testing';

import { DbServerRequestsService } from './db-server-requests.service';

describe('DbServerRequestsService', () => {
  let service: DbServerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbServerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
