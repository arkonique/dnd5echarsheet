import React from "react"

export default function Info(props) {
    const [inputValue,setValue] = React.useState(props.value)
    function updateVal(e){
        setValue(e.target.value)
        props.onEdit({value:e.target.value,id:e.target.name})
    }

    React.useEffect(() => {
        setValue(props.value)
    },[props.value])

    return(
        <label className="info" id={props.id}>
            {props.labeldisp ? <span className="label">{props.label}</span> : null}
            <input type="text" value={inputValue} name={props.id} onChange={updateVal} placeholder={(props.labeldisp)?"":props.label}></input>
        </label>
    )
}