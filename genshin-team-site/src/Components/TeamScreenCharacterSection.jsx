import { useState, useContext} from "react";
import { SiteContext } from "../App";
import { TeamScreenContext } from "./TeamScreen";

export default function TeamScreenCharacterSection({character, note, index}){
	const [currentNote, setNote] = useState(note);
	let noteID = "note" + index; 
	const context = useContext(SiteContext);
	const currSite = useContext(TeamScreenContext).currSite;
	const travelerPreference = localStorage.getItem("TravelerPreference");
	const imgClass = "banner" + (character.name==="Blank"? " blank-banner" : "");
	let imgPath = "./" + currSite + "/Banner/" + character.name + ".png";
	
	function openModal(e){
		e.stopPropagation();
		context.saveTeam({notifyUser: false});
		context.openModal(character, index); 
	}
	
	function updateNote(e){
		setNote(() => {return e.target.value});
	}
	
	if (currSite === "Genshin Impact" && character.name === "Traveler"){
		let replacement;
		travelerPreference === null || travelerPreference === undefined ? replacement = "M" : replacement = travelerPreference;
		imgPath = "./" + currSite + "/Banner/" + character.name + replacement +  ".png";
	}
	
	return(
		<div className="team-character-section">
			<div className="section-character-name" onClick={e => openModal(e)}>
				<center>
					{character.name}
				</center>
			</div>
			
			<div className="section-character-portrait" onClick={e => openModal(e)}>
				 <img className={imgClass} src={imgPath} alt={character.name}></img>
			</div>
			
			<div className="bg-gradient-up" onClick={e => openModal(e)}></div>
			
			<div className="notes-section">
				<div className="character-notes-label">
					Notes:
				</div>
				<div className="section-character-notes">
					<textarea name="newNote" className="notes-form" value={currentNote} onChange={(e) => updateNote(e)} id={noteID} placeholder="Add character notes here.">
					</textarea>
				</div>
			</div>
			
		</div>
	)
}