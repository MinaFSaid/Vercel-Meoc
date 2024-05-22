import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustResultComponent } from './cust-result.component';

describe('CustResultComponent', () => {
  let component: CustResultComponent;
  let fixture: ComponentFixture<CustResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
