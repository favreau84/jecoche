import React from 'react'
import {Fab, Grid, makeStyles} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    fab: {
        margin: "10px",
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

export default function CreateButton(props) {
    
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <Fab 
                    variant="extended" 
                    color='primary' 
                    className={classes.fab}
                    onClick = {props.onClick}
                    size = 'large'
                > 
                    Générer l'attestation 
                </Fab> 
            </Grid>
        
        </Grid>
    )
}
