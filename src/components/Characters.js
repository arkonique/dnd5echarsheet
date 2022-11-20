import React from 'react';
import { parseCookies, postData } from '../functions';

export default function Characters(props){

    const cookies = parseCookies(document.cookie);
    let utoken;
    if (cookies.login==='true'){
        if (!props.token){
            utoken = cookies.token;
        }   
        else{
            utoken = props.token;
        }
        const [characters,setCharacters] = React.useState([]);

        async function getCharacters(){
            const data = await postData('http://localhost/dnd_api/accessnode/characters/list',{token:utoken})
            setCharacters(data);
        }

        React.useEffect(() => {
            getCharacters();
        },[])
    

        return(
            <div>
                <h1>Characters</h1>
                <div className="characters">
                    {characters.map((character) => {return (
                    <div className="character" key={character.srno} onClick={() => props.checkSelection(character.srno)}>
                        <img src={require("../../"+character.portrait.split("./")[1])} alt="Character Portrait"/>
                        <p>{character.charname}</p>
                        <p>{character.race}</p>
                    </div>
                    )})}
                    <button onClick={() => props.checkSelection(0)}>Create New Character</button>
                </div>
            </div>
        )
        

    }

    
}