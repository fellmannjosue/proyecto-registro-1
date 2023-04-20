import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoLoginComponent } from './tecnico-login.component';

describe('TecnicoLoginComponent', () => {
  let component: TecnicoLoginComponent;
  let fixture: ComponentFixture<TecnicoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
