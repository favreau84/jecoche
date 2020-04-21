import React from 'react'
import {withRouter} from 'react-router-dom'

import {TextField, Button, IconButton, Grid, Typography} from '@material-ui/core'
import {Close} from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles';
import eyes from '../assets/eyes.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width:300
    },
  },
  info: {
  },
  image: {
      width: 150
  }
}));

function Profile(props){

    const classes = useStyles();

    const [profile, setProfile] = React.useState(()=>props.profile)

    function handleProfileSubmit(){
        props.onSubmit(profile);
        props.history.push('/');
    }
    function _addslash(input){
        // 249 => 24/9
        const r1 = /^(?<day>\d\d)(?<monthStart>\d)\b/g 
        const mr1 = r1.exec(input)
        if(mr1){
            const {groups:{day, monthStart}} = mr1
            return `${day}/${monthStart}`
        }
        // 24098 => 24/09/8
        const r2 = /^(?<day>\d\d)\/(?<month>\d\d)(?<yearStart>\d)\b/g 
        const mr2 = r2.exec(input)
        if(mr2){
            const {groups:{day, month, yearStart}} = mr2
            return `${day}/${month}/${yearStart}`
        }
        return input
    }

    function handleFieldChange(id,value){
        let v = value
        if(id==="birthDate"){
            v=_addslash(v)
        }
        setProfile(profile => ({...profile,[id]:v}))
    }

    function handleClose(){
        props.history.push('/')
    }

    return (
        <div className={classes.root}>
        <Grid container direction="column">
            <Grid item>
                <Grid container justify='flex-end'>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <Close/>
                            </IconButton>
                        </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.info}>
                <Typography  variant="body1">
                    Remplissez une fois pour toute votre profil.
                </Typography>
            </Grid>
            <Grid item>
                <img alt=":-)" src={eyes} className={classes.image}/>
            </Grid>
            <Grid item>
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
                        inputProps={{inputMode:'numeric'}}
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
                </form>
            </Grid>
            <Grid item>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button style={{margin:'16px'}} onClick={handleProfileSubmit} variant="contained" color='primary'>     
                        Enregistrer 
                    </Button>
                    </Grid>
                </Grid>
            </Grid>   
        </Grid> 
    </div>
    )
}

export default withRouter(Profile)