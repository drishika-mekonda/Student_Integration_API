import { TestBed } from '@angular/core/testing';

import { Authorize } from './authorize';

describe('Authorize', () => {
  let service: Authorize;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authorize);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
