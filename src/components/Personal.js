import Info from './Info'
import Portrait from './Portrait'

export default function Personal() {
    return(
        <article id="personal"> 
            <section id="char">
                <Portrait src="logo512.png"/>
                <div className="names-div">
                    <Info id="playname" value="Hoola" />
                    <Info id="charname" value="Hoola" />
                </div>
            </section>
            <section id="basics">
                <Info id="race" label="Race: " value="Hoola" />
                <Info id="background" label="Background: " value="Hoola" />
                <Info id="alignment" label="Alignment: " value="Hoola" />
            </section>
            <section id="appearance">
                <Info id="age" label="Age: " value="Hoola" />
                <Info id="height" label="Height: " value="Hoola" />
                <Info id="weight" label="Weight: " value="Hoola" />
                <Info id="dmarks" label="Distinguishing marks: " value="Hoola" />
                <Info id="eyes" label="Eyes: " value="Hoola" />
                <Info id="skin" label="Skin: " value="Hoola" />
                <Info id="hair" label="Hair: " value="Hoola" />
                <Info id="scars" label="Scars: " value="Hoola" />
            </section>
        </article>
    )
}