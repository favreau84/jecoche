import React from 'react'
import {Button} from '@material-ui/core'

export default function ProfileButton({onClick}) {

    return (

                <Button  onClick={onClick} variant="outlined">
                    Modifier
                </Button>
    )
}
