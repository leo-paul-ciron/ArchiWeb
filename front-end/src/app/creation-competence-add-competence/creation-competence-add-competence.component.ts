import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-creation-competence-add-competence',
  templateUrl: './creation-competence-add-competence.component.html',
  styleUrls: ['./creation-competence-add-competence.component.scss']
})
export class CreationCompetenceAddCompetenceComponent {

  constructor(private apiService: ApiService) { }
  //on récupère du parent
  @Input() afficherFormulaireAddCompetenceBool: boolean = true;

  /*
  * on créer un EventEmiter pour avertir le composant parent du changement
  * de valeur de la variable.
  */
  @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

  Competences : any = null

  ngOnInit()
  {
     //récupération du type de compte dans la localStorage
     const Token : any = localStorage.getItem("token");
     const TokenDecode : any = jwt_decode(Token)
     this.typeCompte = TokenDecode.type;
     this.typeCompte = this.typeCompte.toLowerCase()
     this.idUtilisateur = TokenDecode.utilisateur
 
     
 
     this.apiService.GetCompetence().subscribe({
       next: (data) => {
         this.Competences = data
        
       },
     });
  }


  // Affiche conditionel du formulaire
  //lors du click sur le boutton le formulaire apparait.
  FormAddCompetenceDisparition()
  { 
    this.afficherFormulaireAddCompetenceBool = false; 

    //on envois l'event de changement de la variable
    this.AfficherPageAdminEventEmitter.emit(this.afficherFormulaireAddCompetenceBool);
  } 

  selectedValues: string[] = [];

  onCheckboxChange (event: any, value: string): void
  {
    const index = this.selectedValues.indexOf(value);

    if (index !== -1) {
      this.selectedValues.splice(index, 1);
    }
    else{
     
      this.selectedValues.push(value);
    }

  }
 
  nomCompetence : string = ''
  niveauCompetence : number = 0
  id_admin : string = '64523a3ba975dc50e7e3767d'
  typeCompte : string = ""
  idUtilisateur : string = ""

  onSubmitAddCompetence(formulaire : any)
  {   

      formulaire.value.id_admin = this.id_admin;
      const Token : any = localStorage.getItem("token");
      const TokenDecode : any = jwt_decode(Token)
      this.typeCompte = TokenDecode.type;
      this.typeCompte = this.typeCompte.toLowerCase();
      this.idUtilisateur = TokenDecode.utilisateur;

      const competence = {
        idProf : this.idUtilisateur,
        nomCompetence: formulaire.value.nomCompetence,
        niveauCompetence: formulaire.value.niveauCompetence,
        id_admin: this.id_admin,
        selectedValue : this.selectedValues
      };

    

      //appel du service d'ajout d'utilisateur
      this.apiService.AddCompetence(competence).subscribe({
        next: (data) => {
          
        },
        error: (error) => {
          Swal.fire("Erreur lors de l'ajout de la compétence!");
         
        },
        complete: () => {
          this.FormAddCompetenceDisparition()
          Swal.fire('Compétence Ajoutée!');
        }
      });

      
  }
}
