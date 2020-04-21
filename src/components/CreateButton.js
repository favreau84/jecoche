import React from 'react'
import {Fab, Grid} from '@material-ui/core'

const style = {
    margin: "10px"
}

export default function CreateButton(props) {
    
    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <Fab 
                    variant="extended" 
                    color='primary' 
                    style={style}
                    onClick = {props.onClick}
                > 
                    Générer l'attestation 
                </Fab> 
            </Grid>
        
        </Grid>
    )
}
