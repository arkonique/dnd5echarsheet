import React from "react"

export default function Portrait(props){

    function changeHandler(e){
        props.onFileSelect(e.target);
    }

    return(
        <label className="img-file">
            <img src={props.src} alt="Character Portrait"></img>
            <input type="file" id="p-loader" onChange={changeHandler} style={{"display": "none"}}></input>
        </label>
    )
}
