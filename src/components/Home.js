import React from 'react';
import {withRouter} from 'react-router-dom'
import {Container, Grid, Paper} from '@material-ui/core'

import CreateButton from './CreateButton'
import ProfileSummary from './ProfileSummary'
import ReasonsForm from './ReasonsForm'
import ProfileButton from'./ProfileButton'
import OutingDateTime from './OutingDateTime'
import Certificate from '../services/certificate/certificate'

function Home(props) {

  const profile = props.profile
  const outingDateTime = props.outingDateTime

  const[reasons, setReasons] = React.useState({work: false, shopping: false, health: false});

  const handleReasonsFormChange = function(newReasons){
    setReasons(newReasons);
  }

  async function handleCreateButtonClick(){
    const newCertif = new Certificate({outingDateTime,profile, reasons})
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
        <Container maxWidth='xs'>
            <Grid container style={{height:'100vh'}} spacing={2} direction='column' alignItems='stretch' justify='space-around'>
                <Grid item>
                    <Grid container alignItems='flex-end' justify='space-between'>
                        <Grid item>
                            <ProfileSummary profile={profile}/>
                        </Grid>
                        <Grid item>
                            <ProfileButton onClick={handleProfileButtonClick}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Paper style={{padding:'10px'}}>
                        <OutingDateTime onChange={handleOutingDateTimeChange} outingDateTime={props.outingDateTime}/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={6}>
                        <ReasonsForm onChange = {handleReasonsFormChange}/>
                        <CreateButton onClick = {handleCreateButtonClick}/>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
        

    </div>
  );
}

export default withRouter(Home);
