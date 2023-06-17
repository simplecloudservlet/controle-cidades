import { TestBed } from '@angular/core/testing';

import { UsuarioObservableHttpJsonserverService } from './usuario-observable-http-jsonserver.service';

describe('UsuarioObservableHttpJsonserverService', () => {
  let service: UsuarioObservableHttpJsonserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioObservableHttpJsonserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
