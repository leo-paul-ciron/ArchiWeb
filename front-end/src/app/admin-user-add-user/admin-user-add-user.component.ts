import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-admin-user-add-user',
  templateUrl: './admin-user-add-user.component.html',
  styleUrls: ['./admin-user-add-user.component.scss']
})

export class AdminUserAddUserComponent {

  //on récupère du parent
  @Input() afficherFormulaireAddUserBool: boolean = true;

  /*
  * on créer un EventEmiter pour avertir le composant parent du changement
  * de valeur de la variable.
  */
  @Output() AfficherPageAdminEventEmitter = new EventEmitter<boolean>();

  nom : string = ''
  prenom : string = ''
  email : string = ''
  motDePasse : string = ''
  idTypeUtilisateur : string = ''
 

 

  constructor(private apiService: ApiService) { }

  // Affiche conditionel du formulaire
  //lors du click sur le boutton le formulaire apparait.
  FormAddUserDisparition()
  { 
    this.afficherFormulaireAddUserBool = false; 

    //on envois l'event de changement de la variable
    this.AfficherPageAdminEventEmitter.emit(this.afficherFormulaireAddUserBool);
  } 

  onSubmitAddUser(formulaire : any)
  {    
      //création d'un nouvelle utilisateur
      const utilisateur = {
        nom: formulaire.value.nom,
        prenom: formulaire.value.prenom,
        email: formulaire.value.email,
        motDePasse: formulaire.value.motDePasse,
        idTypeUtilisateur: formulaire.value.idTypeUtilisateur
      };

      //appel du service d'ajout d'utilisateur
      this.apiService.AddUser(utilisateur).subscribe({
        next: (data) => {
          
        },
        error: (error) => {
          Swal.fire("Erreur lors de l'ajout de l'utilisateur!");
        },
        complete: () => {
          this.FormAddUserDisparition()
          Swal.fire('Utilisateur Ajouté!');
        }
      });

      
  }
  
}
