import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifUserComponent } from './admin-modif-user.component';

describe('AdminModifUserComponent', () => {
  let component: AdminModifUserComponent;
  let fixture: ComponentFixture<AdminModifUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModifUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
