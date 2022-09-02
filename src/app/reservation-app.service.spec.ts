import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReservationAppService } from './reservation-app.service';

describe('ReservationAppService', () => {
  let service: ReservationAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ReservationAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
