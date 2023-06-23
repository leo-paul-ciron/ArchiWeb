import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCompetenceComponent } from './creation-competence.component';

describe('CreationCompetenceComponent', () => {
  let component: CreationCompetenceComponent;
  let fixture: ComponentFixture<CreationCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
