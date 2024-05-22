import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSidebarComponent } from './sys-sidebar.component';

describe('SysSidebarComponent', () => {
  let component: SysSidebarComponent;
  let fixture: ComponentFixture<SysSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
