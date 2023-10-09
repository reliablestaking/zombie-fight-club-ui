import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HunterComponent } from './hunter.component';

describe('HunterComponent', () => {
  let component: HunterComponent;
  let fixture: ComponentFixture<HunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HunterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
