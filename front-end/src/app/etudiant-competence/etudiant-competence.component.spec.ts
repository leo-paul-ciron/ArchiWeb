import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantCompetenceComponent } from './etudiant-competence.component';

describe('EtudiantCompetenceComponent', () => {
  let component: EtudiantCompetenceComponent;
  let fixture: ComponentFixture<EtudiantCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
