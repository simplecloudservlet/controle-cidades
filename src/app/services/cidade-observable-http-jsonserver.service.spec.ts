import { TestBed } from '@angular/core/testing';

import { CidadeObservableHttpJsonserverService } from './cidade-observable-http-jsonserver.service';

describe('CidadeObservableHttpJsonserverService', () => {
  let service: CidadeObservableHttpJsonserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadeObservableHttpJsonserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
