import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-creation-cours-add-cour',
  templateUrl: './creation-cours-add-cour.component.html',
  styleUrls: ['./creation-cours-add-cour.component.scss']
})
export class CreationCoursAddCourComponent {
  constructor(private apiService: ApiService) { }

  selectedValue : string = ""
  competence : string = ''
  nomCour : string = ''
  descriptionCour : string = ""
  id_admin : string = '64523a3ba975dc50e7e3767d'
  typeCompte : any = ""
  Competences : any ;

  idUtilisateur : string = ""
   //on récupère du parent
   @Input() afficherFormulaireAddCoursBool: boolean = true;

   /*
   * on créer un EventEmiter pour avertir le composant parent du changement
   * de valeur de la variable.
   */
   @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

   ngOnInit() {
      
    //récupération du type de compte dans la localStorage
    const Token : any = localStorage.getItem("token");
    const TokenDecode : any = jwt_decode(Token)
    this.typeCompte = TokenDecode.type;
    this.typeCompte = this.typeCompte.toLowerCase()
    this.idUtilisateur = TokenDecode.utilisateur

    

    this.apiService.GetCompetence().subscribe({
      next: (data) => {
        this.Competences = data
        console.log(this.Competences);
      },
    });

    
  }

  // Affiche conditionel du formulaire
  //lors du click sur le boutton le formulaire apparait.
  FormAddCompetenceDisparition()
  { 
    this.afficherFormulaireAddCoursBool = false; 

    //on envois l'event de changement de la variable
    this.AfficherPageAdminEventEmitter.emit(this.afficherFormulaireAddCoursBool);
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

 
  onSubmitAddCours(formulaire : any)
  {   

      formulaire.value.id_admin = this.id_admin;

      /*const jsonArray = JSON.stringify(this.selectedValues)
  
      console.log(jsonArray);
      console.log("descirption cour "+ formulaire.value.descriptionCour);
*/
      console.log(this.selectedValues)
      const cour = {
        nomCour: formulaire.value.nomCour,
        descriptionCour: formulaire.value.descriptionCour,
        id_enseignant: this.id_admin,
        id_competence: this.selectedValues
      };
  
      console.log(cour);

      //appel du service d'ajout d'utilisateur
      this.apiService.AddCour(cour).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          Swal.fire("Erreur lors de l'ajout du cour !");
          console.log(error)
        },
        complete: () => {
          this.FormAddCompetenceDisparition()
          Swal.fire('Cour Ajouté !');
        }
      });
  }


}
