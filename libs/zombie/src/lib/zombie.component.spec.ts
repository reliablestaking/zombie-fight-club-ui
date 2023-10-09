import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZombieComponent } from './zombie.component';

describe('ZombieComponent', () => {
  let component: ZombieComponent;
  let fixture: ComponentFixture<ZombieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZombieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZombieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
