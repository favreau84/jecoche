import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {FormControl, FormLabel, FormControlLabel, Checkbox, FormGroup} from '@material-ui/core'

const outingReasons = [
    {id:'work', title:'Travail'},
    {id:'shopping', title:'Courses'},
    {id:'health', title:'Santé'},
];

const useStyles = makeStyles((theme) =>({
    formControl: {
        margin: theme.spacing(3)
    }
}))

const ReasonsForm = function(props){
    
    const getInitialState = function(){
        let initialState = {}
        outingReasons.forEach(reason => {
            initialState = {...initialState,[reason.id]:false}
        });
        
        return initialState;
    }
    const [state, setState] = React.useState(getInitialState())

    const classes = useStyles();

    React.useEffect(() => {
        props.onChange(state)
    },[state,props]);

    const handleChange = function(event){
        setState(state => ({...state,[event.target.name]:event.target.checked}))
    }
    return(
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Motifs de déplacement</FormLabel>
        <FormGroup>
            {outingReasons.map(reason => {
                return (
                    <FormControlLabel key={reason.id}
                    control={<Checkbox 
                                checked={state[reason.id]} 
                                onChange={handleChange} 
                                name={reason.id} 
                            />}
                    label={reason.title}
                  />
                )
            })}
        </FormGroup>
      </FormControl>
    )
}

export default ReasonsForm
