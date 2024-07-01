import { useState } from "react";

export default function TeamScreenCharacterSection({character, note}){
	const [currentNote, setNote] = useState(note);
	
	function NotesForm(){
		return;
	}	
	
	return(
		<div className="team-character-section">
				{/*Place character name*/}
				{/*Place character portrait*/}
				{/*Place character note*/}
			<div className="section-character-name">
				<center>
					{character}
				</center>
			</div>
			
			<div className="section-character-portrait">
				 <img className="banner" src={"./Banner/" + character + ".png"}></img>
			</div>
			
			<div className="bg-gradient-up"></div>
			
			<div className="notes-section">
				<div className="character-notes-label">
					Notes:
				</div>
				<div className="section-character-notes">
					<textarea name="newNote" className="notes-form" value={currentNote} onChange={(e) => setNote(e.target.value)}>
					</textarea>
					{/*Function to display "Character notes" if no notes are found*/}
				</div>
			</div>
			
		</div>
	)
}