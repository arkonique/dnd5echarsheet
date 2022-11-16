import React from 'react'
import Personal from "./Personal";

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
    } // API call ends here \\

    

function Sheet(){
    return(
        <>
        <Personal dataArray={personalArray}/>
        <Classes dataArray={classArray}/>
        {/*Rest of the sheet goes here*/}
        </>
    )
}

export default Sheet