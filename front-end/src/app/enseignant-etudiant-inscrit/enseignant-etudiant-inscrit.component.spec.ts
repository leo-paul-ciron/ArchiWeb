import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantEtudiantInscritComponent } from './enseignant-etudiant-inscrit.component';

describe('EnseignantEtudiantInscritComponent', () => {
  let component: EnseignantEtudiantInscritComponent;
  let fixture: ComponentFixture<EnseignantEtudiantInscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantEtudiantInscritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantEtudiantInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
