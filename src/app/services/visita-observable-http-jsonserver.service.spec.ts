import { TestBed } from '@angular/core/testing';

import { VisitaObservableHttpJsonserverService } from './visita-observable-http-jsonserver.service';

describe('VisitaObservableHttpJsonserverService', () => {
  let service: VisitaObservableHttpJsonserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaObservableHttpJsonserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
