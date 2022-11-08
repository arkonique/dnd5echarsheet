export default function Info(props) {
    return(
        <label className="info" id={props.id}>
            {props.label}
            <input type="text" value={props.value} name={props.name}></input>
        </label>
    )
}