import React from 'react'
import {TextField, Button} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function Profile(){

    const classes = useStyles();

    const [profile, setProfile] = React.useState({
        firstName:'',
        lastName:'',
        birthDate:'',
        birthPlace: ''
    })



    return (
        <div className={classes.root}>
            <form>
                <div>
                    <TextField id="firstName" label="Prénom" variant="filled" />
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
                    <Button variant="contained" color='primary' > Enregistrer </Button>
                </div>   
            </form>
            
        </div>
    )
}
