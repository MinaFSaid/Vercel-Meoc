import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCustomizationComponent } from './plan-customization.component';

describe('PlanCustomizationComponent', () => {
  let component: PlanCustomizationComponent;
  let fixture: ComponentFixture<PlanCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanCustomizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
