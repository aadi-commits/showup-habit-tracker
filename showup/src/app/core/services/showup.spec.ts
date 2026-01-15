import { TestBed } from '@angular/core/testing';

import { Showup } from './showup';

describe('Showup', () => {
  let service: Showup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Showup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
