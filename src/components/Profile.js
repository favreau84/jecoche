import React from 'react'
import {TextField, Button} from '@material-ui/core'
import storage from '../services/storage'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Profile(props){

    const classes = useStyles();

    const [profile, setProfile] = React.useState({
        firstName:'',
        lastName:'',
        birthDate:'',
        birthPlace: ''
    })

    React.useEffect(()=>{
        async function getStoredProfile(){
            const storedProfile =  await storage.getProfile()
            setProfile(profile => ({...profile,...storedProfile}))
            console.log(storedProfile)
        }
        getStoredProfile();
    },[])

    function onProfileSubmit(){
        storage.saveProfile(profile);
        props.onSubmit(profile)
    }

    function onFieldChange(id,value){
           setProfile(profile => ({...profile,[id]:value}))
    }


    return (
        <div className={classes.root}>
            <form>
                <div>
                    <TextField id="firstName" 
                    label="Prénom" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>onFieldChange(id,value)} 
                    value={profile.firstName}/>
                </div>
                <div>
                    <TextField id="lastName" label="Nom" variant="filled" />
                </div>
                <div>
                    <TextField id="birthDay" label="Né le" variant="filled" />
                </div>
                <div>
                    <TextField id="birthPlace" label="A" variant="filled" />
                </div> 
                <div>
                    <Button onClick={onProfileSubmit} variant="contained" color='primary' > Enregistrer </Button>
                </div>   
            </form>
            
        </div>
    )
}
