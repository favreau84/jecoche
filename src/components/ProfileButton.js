import React from 'react'
import {IconButton} from '@material-ui/core'
import {Person} from '@material-ui/icons'

export default function ProfileButton({onClick}) {
    return (
        <div>
        <IconButton onClick={onClick} color="primary" variant="outlineds">
            <Person/>
        </IconButton>
        </div>
    )
}
