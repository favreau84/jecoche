import React from 'react'
import {TextField} from '@material-ui/core'

export default function OutingDateTime(props) {


    const handleFieldChange = function(id,value){
        props.onChange({...props.outingDateTime, [id]:value})
    }

    const containerStyle = {
        display : 'flex',
        justifyContent : 'space-around',
        alignContent: 'center'
    }

    return (
        <div >
            <form>
                <div style = {containerStyle} >
                    <div>
                        <TextField id="outingDate" 
                        label="Date de sortie" 
                        variant="filled" 
                        onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                        value={props.outingDateTime.outingDate}/>
                    </div>
                    <div>
                        <TextField id="outingTime" 
                        label="Heure de sortie" 
                        variant="filled" 
                        onChange={({target: {id,value}})=>handleFieldChange(id,value)} 
                        value={props.outingDateTime.outingTime}/>
                    </div>
                </div>
            </form>
            
        </div>
    )
}
