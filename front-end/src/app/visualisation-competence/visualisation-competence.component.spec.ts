import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationCompetenceComponent } from './visualisation-competence.component';

describe('VisualisationCompetenceComponent', () => {
  let component: VisualisationCompetenceComponent;
  let fixture: ComponentFixture<VisualisationCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualisationCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
