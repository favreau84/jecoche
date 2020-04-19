import React from 'react'
import {Typography} from '@material-ui/core'

export default function ProfileSummary(props) {
    const{firstName, lastName, birthDate, birthPlace, addressStreet, addressZipcode, addressCity}=props.profile
    return (
        <div style={{textAlign:'left'}}>
            <Typography variant='h6' color='textPrimary' style={{textAlign:'left'}}>
                {`${firstName} ${lastName}` }
            </Typography>
            <Typography color='textSecondary' style={{textAlign:'left'}}>
                {`né le ${birthDate} à ${birthPlace}` }
            </Typography>
            <Typography color='textPrimary'>
                {addressStreet}
                <br/>
                {`${addressZipcode}  ${addressCity}` }
            </Typography>
        </div>
    )
}
