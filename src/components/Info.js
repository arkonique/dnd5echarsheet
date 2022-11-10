import React from "react"

export default function Info(props) {
    const [inputValue,setValue] = React.useState(props.value)
    function updateVal(e){
        setValue(e.target.value)
        props.onEdit({value:e.target.value,id:e.target.name})
    }

    return(
        <label className="info" id={props.id}>
            {(props.labeldisp)?props.label:""}
            <input type="text" value={inputValue} name={props.id} onChange={updateVal} placeholder={(props.labeldisp)?"":props.label}></input>
        </label>
    )
}