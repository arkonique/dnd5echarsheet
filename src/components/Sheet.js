import React from 'react'
import Personal from "./Personal";
import Classes from "./Classes";
import { parseCookies, postData } from '../functions';


function Sheet(){
        
        // Load dataArray from API instead of hardcoding. This is just a test
        const personalArray = {
            portrait:"logo512.png",
            playname:"Player",
            charname:"Character",
            race:"Race",
            background:"Background",
            alignment:"Alignment",
            age:26,
            height:"6'11\"",
            weight:365,
            dmarks:"Distinguishing Marks",
                eyes:"Eyes",
                skin:"Skin",
                hair:"Hair",
                scars:"Scars"
            } 
            
            const classArray = {}
            // API call ends here \\
            
            

        const [personal,setPersonal] = React.useState(personalArray);
        const [classes,setClasses] = React.useState(classArray);

        let cookies = parseCookies(document.cookie);
        async function getCharacterPersonal(){
            const data = await postData('http://localhost/dnd_api/accessnode/characters/get',{srno:cookies.srno})
            setPersonal(data[0][0])
            setClasses(data[1][0])
        }
        
        React.useEffect(() => {
            getCharacterPersonal();
        },[])


    return(
        <>
        <Personal/>
        <Classes/>
        {/*Rest of the sheet goes here*/}
        <button>Save</button>
        </>
    )
}

export default Sheet