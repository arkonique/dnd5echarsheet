import React from 'react'
import Info from './Info'
import Portrait from './Portrait'

export default function Personal() {

    // Load dataArray from API instead of hardcoding. This is just a test
    const dataArray = {
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
    } // API call ends here 

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [personalData,setPersonalData] = React.useState(dataArray)
    
    function updateData(e) {
        var data = personalData
        data[e.id] = e.value
        //data[this.id] = e;
        setPersonalData(data)
    }

    function updatePortrait(e){
        var data = personalData
        setSelectedFile(e.files[0])

        // Upload file here using API

        // End API call

        data.portrait=e.files[0].name;
        console.log(selectedFile)
    }



    return(
        <article id="personal"> 
            <section id="char">
                <Portrait src={personalData.portrait} onFileSelect={(e) => updatePortrait(e)}/>
                <div className="names-div">
                    <Info id="playname" value={personalData.playname} label="Player name" labeldisp={0} onEdit={(e) => updateData(e)}/>
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