import React from 'react'
import {TextField, Grid} from '@material-ui/core'

export default function OutingDateTime(props) {


    const handleFieldChange = function(id,value){
        props.onChange({...props.outingDateTime, [id]:value})
    }

    return (
        <div >
            <form>
                <Grid container spacing={1} >
                    <Grid item xs={6}> 
                        <TextField id="outingDate" 
                        label="Date de sortie" 
                        variant="filled" 
                        onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                        value={props.outingDateTime.outingDate}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outingTime" 
                        label="Heure de sortie" 
                        variant="filled" 
                        onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                        value={props.outingDateTime.outingTime}/>
                    </Grid>
                </Grid>
            </form>
            
        </div>
    )
}
