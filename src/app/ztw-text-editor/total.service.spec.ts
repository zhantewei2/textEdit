import { TestBed, inject } from '@angular/core/testing';

import { TotalService } from './total.service';

describe('TotalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalService]
    });
  });

  it('should ...', inject([TotalService], (service: TotalService) => {
    expect(service).toBeTruthy();
  }));
});
