import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCompetenceAddCompetenceComponent } from './creation-competence-add-competence.component';

describe('CreationCompetenceAddCompetenceComponent', () => {
  let component: CreationCompetenceAddCompetenceComponent;
  let fixture: ComponentFixture<CreationCompetenceAddCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationCompetenceAddCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationCompetenceAddCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
