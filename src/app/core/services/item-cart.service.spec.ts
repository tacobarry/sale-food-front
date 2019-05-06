import { TestBed } from '@angular/core/testing';

import { ItemCartService } from './item-cart.service';

describe('ItemCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCartService = TestBed.get(ItemCartService);
    expect(service).toBeTruthy();
  });
});
