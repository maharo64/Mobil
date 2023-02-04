import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact , IonSplitPane} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/LoginPage';
import UtilisateurPage from './pages/UtilisateurPage';
import EnchereList from './pages/EnchereList';
import Menu from './components/Menu';
import InsertEncherePage from './pages/InsertEncherePage';
import InsertRechargePage from './pages/InsertRechargerPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <Menu/>
      <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">            
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/insererUser">
                <UtilisateurPage />
              </Route>
              <Route path="/liste" exact={true}>
                <EnchereList />
              </Route>
              <Route exact path="/InsertEncherePage">
                <InsertEncherePage />
              </Route>
              <Route exact path="/InsertRechargePage">
                <InsertRechargePage />
              </Route>             
          </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
