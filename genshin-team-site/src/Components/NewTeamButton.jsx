export default function NewTeamButton({addFunction}){
	{/*Have states, prop
	for team name and characters*/}
	return(
		<div className="new-button team-container" onClick={addFunction}>
			Add New Team
		</div>
	)
}