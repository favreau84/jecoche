import React from 'react';
import {withRouter} from 'react-router-dom'
import {Container, Grid, Paper, Divider, makeStyles} from '@material-ui/core'
//import {openDB} from 'idb'
import setGlobalVars from 'indexeddbshim'
import Dexie from 'dexie'

import CreateButton from './CreateButton'
import ProfileSummary from './ProfileSummary'
import ReasonsForm from './ReasonsForm'
import ProfileButton from'./ProfileButton'
import OutingDateTime from './OutingDateTime'
import Certificate from '../services/certificate/certificate'
import LastCertificate from './LastCertificate'

const useStyles = makeStyles({
    alert:{
        backgroundColor:'#ffe9fd',
        padding:'10px'
    }
})

// Helpers to save Blob in indexedDB
function arrayBufferToBlob(buffer, type) {
    return new Blob([buffer], {type: type});
  }
function blobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', (e) => {
        resolve(reader.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(blob);
    });
}


function Home(props) {

    const classes = useStyles()
    const profile = props.profile
    const outingDateTime = props.outingDateTime

    const[reasons, setReasons] = React.useState({work: false, shopping: false, health: false});

    // generatedPDF

    // state to trakc IDB opening
    const [firstRendered, setFirstRendered] = React.useState(false)
    
    function _useStoredPdf(){
        
        const [storedPdf, setStoredPdf] = React.useState({pdfBlob:null,generatedDate:null,generatedTime:null})
            
        React.useEffect(()=>{
            async function store(){
   
                const db = new Dexie('Certifications')
                db.version(1).stores({
                    pdfOS:'++id'
                })
                console.log('first rendered ? : ',firstRendered)
                if(!firstRendered){
                    const pdfCount = await (db.pdfOS.toCollection().count())
                    if(pdfCount !== 0){
                        //setStoredPdf(await db.get('pdfOS',keys.pop()))
                        const {pdfArrayBuffer, generatedDate, generatedTime} = await db.pdfOS.toCollection().last()
                        const pdfBlob = arrayBufferToBlob(pdfArrayBuffer, 'application/pdf')
                        setStoredPdf({pdfBlob,generatedDate, generatedTime})
                    }
                    setFirstRendered(true)
                } else {
                    if(storedPdf.pdfBlob){
                        await db.pdfOS.clear()
                        storedPdf.pdfArrayBuffer = await blobToArrayBuffer(storedPdf.pdfBlob)
                    }
                    await db.pdfOS.add({...storedPdf,pdfBlob:null})
                }
            }
            store();
        },[storedPdf])
        
        return [storedPdf, setStoredPdf]
    }
    
    const [storedPdf, setStoredPdf] = _useStoredPdf()

  const handleReasonsFormChange = function(newReasons){
    setReasons(newReasons);
  }

  async function handleCreateButtonClick(){
    const newCertif = new Certificate({outingDateTime,profile,reasons})
    await newCertif.generatePdf();
    setStoredPdf(()=>({...storedPdf,generatedDate:newCertif.pdfGenerationDate,generatedTime:newCertif.pdfGenerationTime,pdfBlob:newCertif.pdfBlob}))
    newCertif.downloadPdf();
  }

  function handleProfileButtonClick(){
      props.history.push('/profile')
  }

  function handleOutingDateTimeChange(newOutingDateTime){
      return props.onOutingDateTimeChange(newOutingDateTime)
  }

  // direct to 'Profile' if no username.
  React.useEffect(()=>{
      if(!profile.firstName){
          props.history.push('/profile')
      }
  })

  // alert message
  const lastCertificateContainer=(
      <React.Fragment>
            {(storedPdf && storedPdf.generatedTime)
            ? (
            <><Grid item>
                    <LastCertificate lastCertificate={storedPdf}/> 
                </Grid>
                <Grid item>
                    <Divider/>
                </Grid> </>)
            : (<div></div>)
            // : ( <Container className={classes.alert}>
            //     <span role='img' aria-label="/!\"> ⚠️ Aucune attestation disponible 😷 💸 💸 👮</span>
            // </Container>
            }
      </React.Fragment>
  )

  return (
    <div>
        <Container maxWidth='xs'>
            <Grid container spacing={2} direction='column' alignItems='stretch' justify='space-around'>
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
                    <Divider/>
                </Grid>
                {lastCertificateContainer}
                <Grid item>
                        <OutingDateTime onChange={handleOutingDateTimeChange} outingDateTime={props.outingDateTime}/>
                </Grid>
                <Grid item>
                    <Paper elevation={6}>
                        <ReasonsForm onChange = {handleReasonsFormChange}/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <CreateButton onClick = {handleCreateButtonClick}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        

    </div>
  );
}

export default withRouter(Home);
