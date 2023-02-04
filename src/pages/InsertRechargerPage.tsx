import InsertRecharger from"../components/InsertRecharger";
import {IonMenuButton,IonContent, IonHeader  ,IonRefresherContent,IonRefresher , IonButtons , IonPage , IonTitle, IonToolbar } from '@ionic/react';
const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
};
const InsertRechargePage: React.FC = () => {
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
          <InsertRecharger />
        </IonContent>
      </IonPage>
    );
};
export default InsertRechargePage;