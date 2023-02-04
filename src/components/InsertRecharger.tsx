import React, { useState } from 'react';
import { IonButton, IonMenuButton , IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonRow , IonCol , useIonToast , IonToolbar, useIonRouter , IonAlert } from '@ionic/react';
import axios from 'axios';
import './Insert.css';


const InsertRecharger: React.FC = () =>{
    const[montant, setMontant] = useState('');
    const[toast]=useIonToast();
    const [showAlert,setShowAlert] = useState(false);

   function addEnchere(){
    axios.post("http://localhost:8080/rechargement",{
        
        idUtilisateur:sessionStorage.getItem("idUtilisateur"),
        montant:montant

    }).then(response=> {
        if(response.data.data != null){
            setShowAlert(true);
        }else{
            toast({
                message:response.data.error.message,
                duration:200,
                position:'bottom'
            });
        }
    });
   };
   return(
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Recharger Compte</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                </IonToolbar>
        </IonHeader>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel position="floating">montant</IonLabel>
                        <IonInput required type ="number"  value={montant} onInput={(e:any)=>setMontant(e.target.value)}></IonInput>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonButton  expand="block" color="primary"  onClick={ () => addEnchere()}>Ajouter</IonButton>       
                </IonCol>
            </IonRow>
            <IonAlert
             isOpen={showAlert}
             
             header={'Succesful'}
             message={'Compte Recharger'}
             buttons={['OK']}
            /> 
        </IonContent>
   )

    
};
export default InsertRecharger;