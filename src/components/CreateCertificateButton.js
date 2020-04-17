import React from 'react'
import {Button} from '@material-ui/core'

const style = {
    margin: "10px"
}

export default function CreateCertificateButton(props) {
    
    return (
        <div>
            <Button 
                variant="contained" 
                color='primary' 
                style={style}
                onClick = {props.onClick}
            > 
                Générer l'attestation 
            </Button>    
        </div>
    )
}
