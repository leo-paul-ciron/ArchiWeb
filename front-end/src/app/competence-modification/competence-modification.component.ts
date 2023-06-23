import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competence-modification',
  templateUrl: './competence-modification.component.html',
  styleUrls: ['./competence-modification.component.scss']
})
export class CompetenceModificationComponent {

  @Input() competenceModif: string = "";
  @Input() affichageModifCompetence: boolean = true;

  @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

  constructor(private apiService: ApiService, private router: Router) { }

  typeCompte : any = ""

  afficherFormulaireAddUserBool : boolean = false;
  Competence : any = "";


  ngOnInit() {
      
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()

    this.apiService.RecupCompetenceId(this.competenceModif).subscribe({
      next: (data) => {
        this.Competence = data
        console.log(this.Competence);
        
      },
    });

  }
  

  nomCompetence : string = ''
  niveauCompetence : number = 0
  id_admin : string = '64523a3ba975dc50e7e3767d'
  idUtilisateur : string = ""
  
  
  
  onSubmitModifCompetence(formulaire : any)
  {   
     
      //création d'un nouvelle utilisateur
      const competence = {
        nom: formulaire.value.nomCompetence,
        niveau : formulaire.value.niveauCompetence,
        idCompetence : this.competenceModif
      }; 

      console.log(competence)
      this.apiService.UpdateCompetence(competence).subscribe({
        next: (data) => {
          console.log("je suis data : " + data);
        },
        error: (error) => {
          Swal.fire("Erreur lors de l'ajout de la modification de la compétence!");
        },
        complete: () => {
          this.afficherFormulaireAddUserBool = false; 

          //on envois l'event de changement de la variable
          this.AfficherPageAdminEventEmitter.emit(this.afficherFormulaireAddUserBool);
          Swal.fire('Compétence Modifié!');
        }
      });
  }
}
