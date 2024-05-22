import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNowComponent } from './download-now.component';

describe('DownloadNowComponent', () => {
  let component: DownloadNowComponent;
  let fixture: ComponentFixture<DownloadNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadNowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
