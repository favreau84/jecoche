import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'

import './App.css';

function App() {

  //hook
  function usePersistedState(key, defaultValue) {
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    React.useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }

  const _initialProfile = {
    firstName:'',
    lastName:'',
    birthDate:'',
    birthPlace: ''
  }

  const[profile, setProfile] = usePersistedState("profile",_initialProfile)

  function handleProfileSubmit(newProfile){
    setProfile({...profile,...newProfile})
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact render={()=><Home profile = {profile}/>}/>
        <Route path="/profile" render={()=><Profile onSubmit = {handleProfileSubmit} profile={profile}/>}/>
      </BrowserRouter>

    </div>
  );
}

export default App;
