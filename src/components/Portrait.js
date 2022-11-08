export default function Portrait(props){
    return(
        <label class="img-file">
            <img src={props.src} alt="Character Portrait"></img>
            <input type="file" id="p-loader"></input>
        </label>
    )
}
