import { useState, useContext} from "react";
import { UserContext } from "../App";

export default function TeamScreenCharacterSection({character, note, index}){
	const [currentNote, setNote] = useState(note);
	let noteID = "note" + index; 
	
	const context = useContext(UserContext);
	
	function openModal(e){
		e.stopPropagation();
		context.openModal(character, index); 
	}
	
	function updateNote(e){
		setNote(() => {return e.target.value});
	}
	
	return(
		<div className="team-character-section">
			<div className="section-character-name" onClick={e => openModal(e)}>
				<center>
					{character}
				</center>
			</div>
			
			<div className="section-character-portrait" onClick={e => openModal(e)}>
				 <img className="banner" src={"./Banner/" + character + ".png"} alt={character}></img>
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