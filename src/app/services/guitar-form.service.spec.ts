import { TestBed } from '@angular/core/testing';

import { GuitarFormService } from './guitar-form.service';

describe('Luv2ShopFormService', () => {
  let service: GuitarFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuitarFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
