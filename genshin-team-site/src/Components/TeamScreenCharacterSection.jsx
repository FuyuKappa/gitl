import { useState} from "react";

export default function TeamScreenCharacterSection({character, note, index}){
	const [currentNote, setNote] = useState(note);
	let noteID = "note" + index; 
	
	function updateNote(e){
		setNote(() => {return e.target.value});
	}
	
	return(
		<div className="team-character-section">
			<div className="section-character-name">
				<center>
					{character}
				</center>
			</div>
			
			<div className="section-character-portrait">
				 <img className="banner" src={"./Banner/" + character + ".png"} alt={character}></img>
			</div>
			
			<div className="bg-gradient-up"></div>
			
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