import React from 'react';
import {withRouter} from 'react-router-dom'

import CreateButton from './CreateButton'
import ReasonsForm from './ReasonsForm'
import ProfileButton from'./ProfileButton'
import OutingDateTime from './OutingDateTime'
import Certificate from '../services/certificate/certificate'

function Home(props) {

  const profile = props.profile

  const[reasons, setReasons] = React.useState({work: false, shopping: false, health: false});

  const handleReasonsFormChange = function(newReasons){
    setReasons(newReasons);
  }

  async function handleCreateButtonClick(){
    const newCertif = new Certificate({profile, reasons})
    await newCertif.generatePdf();
    newCertif.downloadPdf();
  }

  function handleProfileButtonClick(){
      props.history.push('/profile')
  }

  function handleOutingDateTimeChange(newOutingDateTime){
      return props.onOutingDateTimeChange(newOutingDateTime)
  }

  return (
    <div>
        <OutingDateTime onChange={handleOutingDateTimeChange} outingDateTime={props.outingDateTime}/>
        <ProfileButton onClick={handleProfileButtonClick}/>
        <ReasonsForm onChange = {handleReasonsFormChange}/>
        <CreateButton onClick = {handleCreateButtonClick}/>
    </div>
  );
}

export default withRouter(Home);
