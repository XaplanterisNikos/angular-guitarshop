import { TestBed } from '@angular/core/testing';

import { GuitarFormService } from './guitar-form.service';

describe('GuitarShopFormService', () => {
  let service: GuitarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuitarFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
