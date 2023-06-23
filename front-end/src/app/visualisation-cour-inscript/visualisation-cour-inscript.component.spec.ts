import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualisationCourInscriptComponent } from './visualisation-cour-inscript.component';

describe('VisualisationCourInscriptComponent', () => {
  let component: VisualisationCourInscriptComponent;
  let fixture: ComponentFixture<VisualisationCourInscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualisationCourInscriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualisationCourInscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
