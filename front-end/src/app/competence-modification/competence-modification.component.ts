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

  //élément récupérer du component parent correspondant à l'id de la compétence à modifier
  // et à la condition permettant l'affichage de la partie modification
  @Input() competenceModif: string = "";
  @Input() affichageModifCompetence: boolean = true;

  /*
  * on créer un EventEmiter pour avertir le composant parent du changement
  * de valeur de la variable.
  */
  @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

  constructor(private apiService: ApiService, private router: Router) { }

  typeCompte : any = ""

  afficherFormulaireAddUserBool : boolean = false;
  Competence : any = "";
  nomCompetence : string = ''
  niveauCompetence : number = 0
  idUtilisateur : string = ""

  ngOnInit() {
      
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)

    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()

    //appel de la route GET http://localhost:3000/competence/:id
    this.apiService.RecupCompetenceId(this.competenceModif).subscribe({
      next: (data) => {
        this.Competence = data      
      },
    });

  }
  
  onSubmitModifCompetence(formulaire : any)
  {   
     
      //création d'un nouvelle utilisateur
      const competence = {
        nom: formulaire.value.nomCompetence,
        niveau : formulaire.value.niveauCompetence,
        idCompetence : this.competenceModif
      }; 

      //appel de la route POST http://localhost:3000/competence/updateCompetence
      this.apiService.UpdateCompetence(competence).subscribe({
        next: (data) => {
          
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
