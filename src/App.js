import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'


import './App.css';

function App(props) {

  //hook
  function _usePersistedState(key, defaultValue) {
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    React.useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }


  // profile state
  const _initialProfile = {
    firstName:'',
    lastName:'',
    birthDate:'',
    birthPlace: '',
    addressStreet:'',
    addressZipcode:'',
    addressCity:'',
  }
  const[profile, setProfile] = _usePersistedState("profile",_initialProfile)
  
  function handleProfileSubmit(newProfile){
    setProfile({...profile,...newProfile})
  }

  // outingDateTime state

  const _initializeOutingDateTime = function(){
    return ({
        outingDate : new Date().toLocaleDateString('fr-FR'),
        outingTime : new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
    })
  }
  const [outingDateTime, setOutingDateTime] = React.useState(()=>_initializeOutingDateTime());

  function handleOutingDateTimeChange(newOutingDateTime){
    setOutingDateTime({...outingDateTime,...newOutingDateTime})
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route path='/' exact render={()=>{
          return (<Home 
            profile = {profile} 
            onOutingDateTimeChange = {handleOutingDateTimeChange} 
            outingDateTime = {outingDateTime}
          />)}
        }
        />
        <Route path="/profile" render={()=><Profile onSubmit = {handleProfileSubmit} profile={profile}/>}/>

      </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;
