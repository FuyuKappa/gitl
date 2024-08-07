export default function NewTeamButton({addFunction}){
	return(
		<div className="new-button team-container" onClick={addFunction}>
			Add New Team
		</div>
	)
}