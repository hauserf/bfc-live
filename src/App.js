import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

//app components
import BFCLive from './bfc-live';
import Footer from './components/footer';
import Roster from './components/roster';



const App = () => {
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" component={BFCLive} />
          <Route path="/bfc-live" component={BFCLive} />
          <Route path="/roster" component={Roster} />
          <Footer />
        </div>
      </BrowserRouter>
    )
}

export default App;
