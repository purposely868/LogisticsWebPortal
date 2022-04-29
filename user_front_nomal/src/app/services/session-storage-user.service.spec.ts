import { TestBed } from '@angular/core/testing';

import { SessionStorageUserService } from './session-storage-content.service';

describe('LocalStorageUserService', () => {
  let service: SessionStorageUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
