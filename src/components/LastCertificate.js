import React from 'react'
import {Grid, Button} from '@material-ui/core'
import {PictureAsPdf} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    note:{
        fontSize:'0.9rem',
    },
    button:{
        leftMargin: 'auto'
    }
})
export default function LastCertificate({lastCertificate: {generatedDate, generatedTime, pdfBlob}}) {
    
    const classes = useStyles()
    function handleClick(){
       const link = document.createElement('a')
       link.href = URL.createObjectURL(pdfBlob)
       link.download = 'certificate.pdf'
       document.body.appendChild(link)
       link.click()
    }
    return (
        <Grid container alignItems='center'>
            <Grid item xs={7}>
                <p className={classes.note}>
                    {`Votre dernière attestation a été générée le ${generatedDate} à ${generatedTime}`}
                </p>
                
            </Grid>
            <Grid item xs={5}>
                <Button 
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    onClick = {handleClick}
                    startIcon={<PictureAsPdf/>}
                > 
                Voir
                </Button>
            <Grid></Grid>

            </Grid>
        </Grid>
    )
}
