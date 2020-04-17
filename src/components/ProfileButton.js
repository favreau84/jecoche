import React from 'react'
import {IconButton} from '@material-ui/core'
import {Person} from '@material-ui/icons'

export default function ProfileButton() {
    return (
        <div>
        <IconButton color="primary" variant="outlined">
            <Person/>
        </IconButton>
        </div>
    )
}
