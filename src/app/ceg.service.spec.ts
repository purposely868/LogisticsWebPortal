import { TestBed } from '@angular/core/testing';
import { CegService } from './ceg.service';

describe('CegService', () => {
  let service: CegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
