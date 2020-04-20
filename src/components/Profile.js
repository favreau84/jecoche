import React from 'react'
import {withRouter} from 'react-router-dom'

import {TextField, Button, IconButton, Grid} from '@material-ui/core'
import {Close} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

function Profile(props){

    const classes = useStyles();

    const [profile, setProfile] = React.useState(()=>props.profile)

    function handleProfileSubmit(){
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
            <Grid container justify='flex-end'>
                <Grid item>
                    <IconButton onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Grid>
            </Grid>

            <form>
                <div>
                    <TextField id="firstName" 
                    label="Prénom" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.firstName}/>
                </div>
                <div>
                    <TextField id="lastName" 
                    label="Nom" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.lastName}/>
                </div>
                <div>
                    <TextField id="birthDate" 
                    label="Date de naissance" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.birthDate}/>
                </div>
                <div>
                    <TextField id="birthPlace" 
                    label="Lieu de naissance" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.birthPlace}/>
                </div>
                <div>
                    <TextField id="addressStreet" 
                    label="Adresse" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.addressStreet}/>
                </div>
                <div>
                    <TextField id="addressZipcode" 
                    label="Code postal"
                    type="number" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.addressZipcode}/>
                </div>
                <div>
                    <TextField id="addressCity" 
                    label="Ville" 
                    variant="filled" 
                    onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                    value={profile.addressCity}/>
                </div>
                <div>
                    <Button onClick={handleProfileSubmit} variant="contained" color='primary' > Enregistrer </Button>
                </div>   
            </form>
            
        </div>
    )
}

export default withRouter(Profile)