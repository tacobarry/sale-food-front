import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedComponent } from './finalized.component';

describe('FinalizedComponent', () => {
  let component: FinalizedComponent;
  let fixture: ComponentFixture<FinalizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
