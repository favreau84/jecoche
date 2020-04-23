import React from 'react';
import {withRouter} from 'react-router-dom'
import {Container, Grid, Paper, Divider, makeStyles} from '@material-ui/core'
//import {openDB} from 'idb'
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
            // console.log(database)
            // const initialStoredPdf = await database.get('pdfOS',1)
            // return(initialStoredPdf)
                // if(pdfInIdb){
                //     return await db.get('pdfOS',1)
                // } else {
                //     console.log(init)
                //     return {pdfBlob:null,generatedDate:null,generatedTime:null}
                // }
            
        React.useEffect(()=>{
            async function store(){
                // const db = await openDB('Certifications',1,{
                //     upgrade(db){
                //         db.createObjectStore('pdfOS', {
                //             keyPath: 'id', 
                //             autoIncrement:true
                //         })
                //     }
                // })
                const db = new Dexie('Certifications')
                db.version(1).stores({
                    pdfOS:'++id'
                })
                console.log('first rendered ? : ',firstRendered)
                if(!firstRendered){
                    const pdfCount = await (db.pdfOS.toCollection().count())
                    if(pdfCount !== 0){
                        //setStoredPdf(await db.get('pdfOS',keys.pop()))
                        setStoredPdf(await db.pdfOS.toCollection().last())
                    }
                    setFirstRendered(true)
                } else {
                    await db.pdfOS.clear()
                    await db.pdfOS.add(storedPdf)
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
                <Grid item>
                    {(storedPdf && storedPdf.generatedTime)
                    ? <LastCertificate lastCertificate={storedPdf}/> 
                    : ( <Container className={classes.alert}>
                        <span role='img' aria-label="/!\"> ⚠️ Aucune attestation disponible 😷 💸 💸 👮</span>
                    </Container>
                    
                    )}
                </Grid>
                <Grid item>
                    <Divider/>
                </Grid>
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
