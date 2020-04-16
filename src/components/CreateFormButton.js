import React from 'react'
import {Button} from '@material-ui/core'

const style = {
    margin: "10px"
}
export default function CreateFormButton() {
    return (
        <div>
            <Button variant="contained" color='primary' style={style}> Générer l'attestation </Button>    
        </div>
    )
}
