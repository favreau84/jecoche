import React from 'react';
import CreateCertificateButton from './components/CreateCertificateButton'
import OutingReasonsCheckboxes from './components/OutingReasonsCheckboxes'
import Profile from './components/Profile'
import Certificate from './services/certificate/certificate'

import './App.css';

function App() {

  const initProfile = {firstName:'Antoine',lastName:'Favreau'};
  const initReasons = {work: false, shopping: false, health: false};

  const[profile, setProfile] = React.useState(initProfile);
  const[reasons, setReasons] = React.useState(initReasons);

  const onReasonsFormChange = function(r){
    setReasons(r);
  }
  const onCreateCertificateBtnClick = async function(){
    const newCertif = new Certificate({profile, reasons})
    await newCertif.generatePdf();
    newCertif.downloadPdf();
  }

  const onProfileSubmit = function(newProfile){
    setProfile({...profile,...newProfile})
  }
  return (
    <div className="App">
       <OutingReasonsCheckboxes onChange = {onReasonsFormChange}/>
       <CreateCertificateButton onClick = {onCreateCertificateBtnClick}/>
       <Profile onSubmit = {onProfileSubmit}/>
    </div>
  );
}

export default App;
