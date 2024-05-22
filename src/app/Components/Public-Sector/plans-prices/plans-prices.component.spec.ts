import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPricesComponent } from './plans-prices.component';

describe('PlansPricesComponent', () => {
  let component: PlansPricesComponent;
  let fixture: ComponentFixture<PlansPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlansPricesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlansPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
