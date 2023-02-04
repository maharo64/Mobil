import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { diamondOutline ,  addCircleOutline, cashOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}
var urlTrue = '';
if((sessionStorage.getItem('token')!= null)&&(sessionStorage.getItem('expiration')!= null)){
    urlTrue='/InsertRechargePage';
  }
else{
  urlTrue='/login';
}

const appPages: AppPage[] = [
  {
    title: 'Liste des encheres',
    url: '/liste',
    iosIcon: diamondOutline,
    mdIcon: diamondOutline
  },
  {
    title: 'Ajouter Enchere',
    url: '/InsertEncherePage',
    iosIcon: addCircleOutline,
    mdIcon: addCircleOutline
  },
  {
    title: 'Recharger Compte',
    url: urlTrue,
    iosIcon: cashOutline,
    mdIcon: cashOutline
  }
  
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Vente</IonListHeader>
          <IonNote>aux encheres </IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
