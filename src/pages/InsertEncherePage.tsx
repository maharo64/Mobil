import InsertEnchere from"../components/InsertEnchere";
import {IonMenuButton,IonContent, IonHeader  ,IonRefresherContent,IonRefresher , IonButtons , IonPage , IonTitle, IonToolbar } from '@ionic/react';
const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
};
const InsertEncherePage: React.FC = () => {
    return (
        <IonPage id="liste-page">
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
          <InsertEnchere />
        </IonContent>
      </IonPage>
    );
};
export default InsertEncherePage;