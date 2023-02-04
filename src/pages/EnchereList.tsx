import ListeEnchere from"../components/ListeEnchere";
import {IonMenuButton,IonContent, IonHeader  ,IonRefresherContent,IonRefresher , IonButtons , IonPage , IonTitle, IonToolbar } from '@ionic/react';
const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
};
const EnchereList: React.FC = () => {
    return(
        <IonPage id="liste-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ventes aux enchers</IonTitle>
            <IonButtons slot="start">
              <IonMenuButton/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
  
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">
                Ventes aux enchers
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <ListeEnchere />
        </IonContent>
      </IonPage>   
        );
};
export default EnchereList;
