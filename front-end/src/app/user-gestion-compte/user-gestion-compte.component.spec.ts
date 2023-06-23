import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGestionCompteComponent } from './user-gestion-compte.component';

describe('UserGestionCompteComponent', () => {
  let component: UserGestionCompteComponent;
  let fixture: ComponentFixture<UserGestionCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGestionCompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGestionCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
