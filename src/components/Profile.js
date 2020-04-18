import React from 'react'
import {withRouter} from 'react-router-dom'

import {TextField, Button, IconButton} from '@material-ui/core'
import {Close} from '@material-ui/icons'
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

function Profile(props){

    const classes = useStyles();

    const [profile, setProfile] = React.useState(()=>props.profile)

    function handleProfileSubmit(){
        storage.saveProfile(profile);
        props.onSubmit(profile);
        props.history.push('/');
    }

    function handleFieldChange(id,value){
        setProfile(profile => ({...profile,[id]:value}))
    }

    function handleClose(){
        props.history.push('/')
    }
    
    return (
        <div className={classes.root}>
            <IconButton onClick={handleClose}>
                <Close/>
            </IconButton>
            <form>
                <div>
                    <TextField id="firstName" 
                    label="Prénom" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
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
                    <Button onClick={handleProfileSubmit} variant="contained" color='primary' > Enregistrer </Button>
                </div>   
            </form>
            
        </div>
    )
}

export default withRouter(Profile)