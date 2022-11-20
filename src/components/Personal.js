import React from 'react'
import Info from './Info'
import Portrait from './Portrait'
import { parseCookies, postData, sendFile } from '../functions';

export default function Personal() {

    // default array
    const personalArray = {
        portrait:"peepoo.png",
        playname:"",
        charname:"",
        race:"",
        background:"",
        alignment:"",
        age:"",
        height:"",
        weight:"",
        dmarks:"",
        eyes:"",
        skin:"",
        hair:"",
        scars:""
    } 
    // default array ends here

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [personalData,setPersonalData] = React.useState(personalArray);

    let cookies = parseCookies(document.cookie);

    async function getCharacterPersonal(){
        let data = await postData('http://localhost/dnd_api/accessnode/characters/get',{srno:cookies.srno})
        let name = await postData('http://localhost/dnd_api/accessnode/user/token',{token:cookies.token})

        data[0][0].playname=name[0].name;
        setPersonalData(data[0][0])
    }

    React.useEffect(() => {
        getCharacterPersonal();
    },[])
    

    
    function updateData(e) {
        var data = personalData
        data[e.id] = e.value
        //data[this.id] = e;
        setPersonalData(data)
    }

    async function updatePortrait(e){
        var data = personalData
        setSelectedFile(e.files[0])

        // Upload file here using API

        // 1. Check if file is an image
        const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
        if (!allowedTypes.includes(e.files[0].type)) {
            alert('File type is not supported')
            return
        }
        // 2. Check if file size is less than 10MB
        if (e.files[0].size > 10 * 1024 * 1024) {
            alert('File size is too big')
            return
        }
        // 3. Create a new FormData object.
        const formData = new FormData()
        // 4. Append the file to the object.
        formData.append('file', e.files[0])
        console.log(e.files[0]);
        // 5. Send the object to the API.
        // 6. Get the response from the API.
        const resp = await sendFile('http://localhost/dnd_api/accessnode/files/upload',formData)
        // 7. Set the response to the data.portrait variable.
        data.portrait=resp.name;
        // 8. Set the data variable to the state variable.
        setPersonalData(data)
        // End API call

    }



    return(
        <article id="personal">
            <section id="char">
                <Portrait src={personalData.portrait} onFileSelect={(e) => updatePortrait(e)}/>
                <div className="names-div">
                    <div id="player"><span id="playname-label">Player</span><span id="playname">{personalData.playname}</span></div>
                    <Info id="charname" value={personalData.charname} label="Character name" labeldisp={0} onEdit={(e) => updateData(e)}/>
                </div>
            </section>
            <section id="basics">
                <Info id="race" label="Race " value={personalData.race} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="background" label="Background " value={personalData.background} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="alignment" label="Alignment " value={personalData.alignment} labeldisp={1} onEdit={(e) => updateData(e)}/>
            </section>
            <section id="appearance">
                <Info id="age" label="Age " value={personalData.age} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="height" label="Height " value={personalData.height} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="weight" label="Weight " value={personalData.weight} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="dmarks" label="Distinguishing marks " value={personalData.dmarks} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="eyes" label="Eyes " value={personalData.eyes} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="skin" label="Skin " value={personalData.skin} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="hair" label="Hair " value={personalData.hair} labeldisp={1} onEdit={(e) => updateData(e)}/>
                <Info id="scars" label="Scars " value={personalData.scars} labeldisp={1} onEdit={(e) => updateData(e)}/>
            </section>
        </article>
    )
}