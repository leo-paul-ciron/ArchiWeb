import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAddUserComponent } from './admin-user-add-user.component';

describe('AdminUserAddUserComponent', () => {
  let component: AdminUserAddUserComponent;
  let fixture: ComponentFixture<AdminUserAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserAddUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
