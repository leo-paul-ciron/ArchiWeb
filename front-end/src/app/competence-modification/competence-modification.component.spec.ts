import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceModificationComponent } from './competence-modification.component';

describe('CompetenceModificationComponent', () => {
  let component: CompetenceModificationComponent;
  let fixture: ComponentFixture<CompetenceModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenceModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
