import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonRow , IonCol , IonIcon , IonToolbar, useIonRouter , IonAlert } from '@ionic/react';
import axios from 'axios';
import React from 'react';
import { personCircle } from 'ionicons/icons';
import { useState } from 'react';
import './Insert.css';





interface Connexion {connect:Function}
const Login: React.FC<Connexion> = ({connect}) => {
const [showAlert,setShowAlert] = useState(false);
const router = useIonRouter();
  const connexion = async (props : any,connect : Function) =>{
    axios.post("http://localhost:8080/utilisateurs/login",{
      identifiant : props.identifiant,
      mdp : props.mdp
    }).then((result) => {
      console.log(result);
        if(result.data.data != null){
          sessionStorage.setItem("token",result.data.data.valeur);
          sessionStorage.setItem("expiration",result.data.data.expiration);
          sessionStorage.setItem("idUtilisateur",result.data.data.idUtilisateur);
          document.location.href=("/liste");
        } 
        if(result.data.data == null){
          setShowAlert(true);
        }
    })
  }

  const [user,setUser] = useState("Bema");
  const [password,setPassword] = useState("maharo000");
  const utilisateur = {
    identifiant : user,
    mdp : password
  };


  return (
      
<IonContent>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Login Enchere</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonRow>
    <IonCol>
      <IonIcon
        style={{fontSize: "70px", color: "#0040ff"  }}
        icon={personCircle}
      />
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
      <IonItem>
        <IonLabel position="floating"> Email </IonLabel>
        <IonInput type='text' value={user} onIonInput={(e:any) => setUser(e.target.value)}></IonInput>
      </IonItem>
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
      <IonItem>
        <IonLabel position="floating">Mot de passe</IonLabel>
        <IonInput  required type='password' value={password}  onIonInput={(e:any) => setPassword(e.target.value)}></IonInput>
      </IonItem>
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
      <IonButton expand="block" color="primary" onClick={() => connexion(utilisateur,connect).then(() =>{
            setUser("");
            setPassword("");
          })}>
      Se Connecter
      </IonButton>    
    </IonCol>
  </IonRow>
  <IonAlert
    isOpen={showAlert}             
    header={'Error'}
    message={'User not existing'}
    buttons={['try again']}
    />
</IonContent>
  );
};

export default Login;

