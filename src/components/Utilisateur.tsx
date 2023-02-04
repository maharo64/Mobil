import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar,IonAlert, useIonToast } from '@ionic/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';


const Utilisateur: React.FC = () =>{
    const [identifiant , setIdentifiant] = useState('');
    const [mdp , setMdp] = useState('');
    const [showAlert , setShowAlert] = useState(false);
    const [toast] = useIonToast();
    function ajouterCompte(){
        axios.post("http://localhost:8080/ajouter",{
            identifiant: identifiant,   
            mdp: mdp
            
        }).then(response => {
            console.log(response.data);
            if(response.data.message == null){
                sessionStorage.setItem("token",response.data.data.valeur);
                sessionStorage.setItem("expiration",response.data.data.expiration);
                sessionStorage.setItem("idUtilisateur",response.data.data.idUtilisateur);
                setShowAlert(true);
            }else{
                toast({
                    message:response.data.message,
                    duration:200,
                    position:'bottom'
                });
            }
        })
    };
    return(
        <IonContent>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Inscription utilisateur</IonTitle>
                </IonToolbar>   
            </IonHeader>
            <IonItem>
                <IonLabel position='floating'>Email</IonLabel>
                <IonInput required type='text' value={identifiant} onIonInput={(e:any) => setIdentifiant(e.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position='floating'>Mot de passe</IonLabel>
                <IonInput required type='password' value={mdp}  onIonInput={(e:any) => setMdp(e.target.value)}></IonInput>
            </IonItem>
            <IonItem><IonButton onClick={ () => ajouterCompte()}>Inscrire</IonButton></IonItem>
            <IonAlert
             isOpen={showAlert}
             
             header={'Succesful'}
             message={'User insert'}
             buttons={['OK']}
            />
        </IonContent>
    )
};
export default Utilisateur;