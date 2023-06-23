import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCoursAddCourComponent } from './creation-cours-add-cour.component';

describe('CreationCoursAddCourComponent', () => {
  let component: CreationCoursAddCourComponent;
  let fixture: ComponentFixture<CreationCoursAddCourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationCoursAddCourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationCoursAddCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
