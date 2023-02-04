import { IonList , IonLabel , IonItem, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import {Enchere} from "../data/enchere";


const ListeEnchere: React.FC = () =>{

  const[encheres,setEncheres]=useState<Array<Enchere>>([]);
  const liste = async() => {
    try{  const result = await fetch("http://localhost:8080/encheres/user/"+sessionStorage.getItem('idUtilisateur'));
          const json = await result.json();
          //console.log(json.data);
          if(json !=null){
            setEncheres(json);
          }
            
    }catch(error){
      console.log(error);
    }
  };
   useEffect(()=>{
     liste();
   },[]);
   var a="";
  return(
    <IonList inset={true}>     
        {encheres.map(list =>  
      <IonItem  key={list.id} >       
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            Image : <img src={list.photo.length ===0 ? '' : list.photo[0]}/>
          </h2>
          <h2>
            Produit : {list.produit}
          </h2>
          <h3>
            Description : {list.description}
          </h3>
          <h3>
            Date enchere : {list.date}
          </h3>
          <h3>
            Categorie : {list.nomCategorie}
          </h3>
          <h3>
            Prix : {list.prix}
          </h3>
          <h3>
            Date :{list.date}
          </h3>
          <h3>
            Vendeur : {list.identifiant}
          </h3>
          <h3>
            Statut : {list.statut == 0 ? (
              <span>en cours</span>
            ) : (
              <span>fini</span>
            )}
          </h3>
        </IonLabel>
      </IonItem>
      )
    }
    </IonList>
)
}
 
export default ListeEnchere;


