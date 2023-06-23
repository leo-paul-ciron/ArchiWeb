import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  /**
   * Envois des informations d'un utilisateur sur la route :
   * http://localhost:3000/admin/addUser.
   * 
   * @param utilisateurJson 
   * @returns 
   * 
   */
  AddUser(utilisateurJson: any) {
      return this.http.post('http://localhost:3000/admin/addUser', utilisateurJson, { withCredentials: true });
  }

  GetUser()
  {
      return this.http.get('http://localhost:3000/admin', { withCredentials: true });
  }

  Login(Compte: any)
  {
      return this.http.post('http://localhost:3000/connexion', Compte,{ withCredentials: true });
  }

  GetCompetence()
  {
    return this.http.get("http://localhost:3000/competence", {withCredentials: true});
  }

   /**
   * Envois des informations d'un utilisateur sur la route :
   * http://localhost:3000/competence/add.
   * 
   * @param competenceJson 
   * @returns 
   * 
   */
  AddCompetence(competenceJson: any) {
    return this.http.post('http://localhost:3000/competence/add', competenceJson, { withCredentials: true });
  }

  GetCoursEnseignant()
  {
    return this.http.get("http://localhost:3000/courEnseignant", { withCredentials: true });
  }

  GetCoursEtudiant()
  {
    return this.http.get("http://localhost:3000/courEtudiant", { withCredentials: true });
  }

   /**
   * Envois des informations d'un utilisateur sur la route :
   * http://localhost:3000/admin/addUser.
   * 
   * @param courJson 
   * @returns 
   * 
   */
  AddCour(courJson: any) {
    return this.http.post('http://localhost:3000/cour/add', courJson, { withCredentials: true });
  }

  InscriptionCour(inscriptionJson : any)
  {
    return this.http.post("http://localhost:3000/inscription/:id", inscriptionJson, { withCredentials: true });
  }

  VisualisationCour()
  {
    return this.http.get('http://localhost:3000/cour/inscrit', {withCredentials: true }, );
  }

  VisualisationCompetence(resultatInfo : any )
  {
    return this.http.get('http://localhost:3000/etudiant/projet/competence', {params : resultatInfo, withCredentials: true});
  }

  ModifCompetence(resultatInfo : any)
  { 
    return this.http.post('http://localhost:3000/modif/resultat', resultatInfo, { withCredentials: true });
  }

  CompetenceEtudiant(etudiantInfo : any)
  { 
    return this.http.get('http://localhost:3000/etudiant/competence',{params :  etudiantInfo, withCredentials: true});
  }

  SupressionUserAdmin(utilisateurInfo : any)
  {
    const url = `http://localhost:3000/admin/deleteUser/${utilisateurInfo}`;
    return this.http.delete(url, { withCredentials: true })
  }

  SuppressionCompetence(competenceId : any)
  {
    const url = `http://localhost:3000/competence/delete/${competenceId}`;
    return this.http.delete(url, { withCredentials: true })
  }

  RecupUserId(idUtilisateur : any)
  {
    const url = `http://localhost:3000/admin/${idUtilisateur}`;
    return this.http.get(url, { withCredentials: true })
    
  }

  RecupCompetenceId(idCompetence : any)
  {
    const url = `http://localhost:3000/competence/${idCompetence}`
    return this.http.get(url, { withCredentials: true })
  }

  UpdateUser( info : any)
  {
      const url = `http://localhost:3000/updateUser/`
      console.log(info);
      return this.http.post(url, info , { withCredentials: true })
  }

  UpdateCompetence( info : any)
  {
      const url = `http://localhost:3000/competence/updateCompetence`
      console.log(info);
      return this.http.post(url, info , { withCredentials: true })
  }

  GetLie(competence : any)
  {  
    const params = new HttpParams()
      .set('competence', competence)
     

    return this.http.get('http://localhost:3000/lie',{params, withCredentials: true });
  }

  GetEtudiantInscritProjet(idProjet : any)
  {
    return this.http.get('http://localhost:3000/etudiant/inscript', {params : idProjet, withCredentials: true })
  }

  GetEtudiantInscritProjetResultat(idProjet: any, idEtudiant: any) {
    const params = new HttpParams()
      .set('param1', idProjet)
      .set('param2', idEtudiant);
  
    return this.http.get('http://localhost:3000/etudiant/inscript/resultat', { params, withCredentials: true });
  }

  DeleteCour(courId : any)
  {
    const url = `http://localhost:3000/cour/delete/${courId}`;
    return this.http.delete(url, { withCredentials: true })
  }

  Desinscription(idInscription : string)
  {
    const url = `http://localhost:3000/desinscription/${idInscription}`;
    return this.http.delete(url, { withCredentials: true })
  }
}