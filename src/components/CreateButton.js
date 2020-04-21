import React from 'react'
import {Button, Grid} from '@material-ui/core'

const style = {
    margin: "10px"
}

export default function CreateButton(props) {
    
    return (
        <Grid container justify='flex-end'>
            <Grid item>
                <Button 
                    variant="contained" 
                    color='primary' 
                    style={style}
                    onClick = {props.onClick}
                > 
                    Générer l'attestation 
                </Button> 
            </Grid>
        
        </Grid>
    )
}
