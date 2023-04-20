import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoRegisterComponent } from './tecnico-register.component';

describe('TecnicoRegisterComponent', () => {
  let component: TecnicoRegisterComponent;
  let fixture: ComponentFixture<TecnicoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TecnicoRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
