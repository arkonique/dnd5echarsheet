import React from "react"
export default function Portrait(props){
    const [image,setImage] = React.useState("")

    
    React.useEffect(() => {
        ((src) => {import(`../../src/img/${src}`).then((img) => {setImage(img.default)})})(props.src)
    },[props.src])

    function changeHandler(e){
        props.onFileSelect(e.target);
    }

    return(
        <label className="img-file">
            {image && <img src={image} alt="Character Portrait"/>}
            <input type="file" id="p-loader" onChange={changeHandler} style={{"display": "none"}}></input>
        </label>
    )
}
