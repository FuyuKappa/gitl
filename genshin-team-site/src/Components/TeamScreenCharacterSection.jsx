export default function TeamScreenCharacterSection({character, note}){
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
			<div className="section-character-notes">
				{note}
				{/*Function to display "Character notes" if no notes are found*/}
			</div>
		</div>
	)
}