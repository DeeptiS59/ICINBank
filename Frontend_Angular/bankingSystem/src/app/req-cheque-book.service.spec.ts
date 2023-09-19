import { TestBed } from '@angular/core/testing';

import { ReqChequeBookService } from './req-cheque-book.service';

describe('ReqChequeBookService', () => {
  let service: ReqChequeBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqChequeBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
