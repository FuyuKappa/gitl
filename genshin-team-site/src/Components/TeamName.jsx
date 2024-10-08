import { useState, useContext, useEffect, useCallback } from 'react';
import { SiteContext } from "../App";

export default function TeamName(props){
	let teamName = props.teamName;
	let containerID = props.id;
	
	let editFill;
	let pencilClassName = "edit-btn";
	if(props.selected === false) editFill = "white";
	else{ editFill = "black"; pencilClassName += " edit-btn-active";}
	

	const [editing, setEditing] = useState(false);
	const [newName, setNewName] = useState("");
	
	const context = useContext(SiteContext);
	const teamID = context.currentTeamID;
	
	function changeValue(e){
		if(e.target.value.length < 50)
			setNewName(e.target.value);
	}
	function toggleEdit(e){
		e.stopPropagation();
		setEditing(() => {return true});
		setNewName(() => {return teamName})
	}
	
	function cancelEdit(e){
		e.stopPropagation();
		setEditing(() => {return false});
	}
	
	function confirmEdit(id, newName, e){
		let noTeamSelected = id === undefined ? true : false;
		e.stopPropagation();
		let diffFlag = false;
		if(!id && id !== containerID){
			id = containerID;
			diffFlag = true;
		}
		else if(id && id !== containerID && containerID){
			id = containerID;
			diffFlag = true;
		}
		
		let description;
		let rotation;
		context.saveTeam({notifyUser: false, switchTeams: true});
		context.setTeams(currentTeams =>{
			return currentTeams.map(currentTeam => {
				console.log(id);
				if(currentTeam.id === id && !noTeamSelected){
					description = document.querySelector(".description-text").value.trim();
					rotation = document.querySelector(".rotation-text").value.trim();
					return { ...currentTeam, description: description, rotation: rotation, name: newName};
					
				}
				else if(currentTeam.id === id && noTeamSelected){
					return { ...currentTeam, name: newName};
				}
				else
					return currentTeam;
			});
		});
		
		let newTeam = context.teams.filter(team=>team.id===id)[0];		
		newTeam.name = newName;
		if(!noTeamSelected){
			newTeam.description = description;
			newTeam.rotation = rotation;
			newTeam.notes = context.getNoteValues();
		}
		
		
		//toggleTeamActive(id);
		//only update team screen if we're not editing the same container
		if(!diffFlag) context.previewTeam(newTeam);
		setEditing(() => {return false});
	}
	
	const handleEsc = useCallback((e) => {
		if(e.key === "Escape")
			cancelEdit(e);
	}, []);
	
	useEffect(() => {
		window.addEventListener("keydown", handleEsc);
		
		return () => window.removeEventListener("keydown", handleEsc);
	},[handleEsc]);
	
	if(editing){
		return(
			<div className="team-name">
				<form onSubmit={(e) => confirmEdit(teamID, newName, e)} className="name-edit-form">
					<input type="text" value={newName} onChange={e => changeValue(e)} onClick = {event => event.stopPropagation()}>
					</input>
					<div className="edit-btn check" onClick={(e) => confirmEdit(teamID, newName, e)}>
						<svg width="16" height="16" className="check-mark" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<line className="check-mark-line" x1="1.5" y1="8" x2="5" y2="13.5" />
							<line className="check-mark-line" x1="5" y1="13.5" x2="13.5" y2="2" />
						</svg>
					</div>
					<div className="edit-btn cross" onClick={(e) => cancelEdit(e)} onKeyPress={(e) => {if(e.key === "Escape")cancelEdit(e)}}>
						<svg width="16" height="16" className="cross-mark" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<line className="cross-mark-line" x1="2.5" y1="2.5" x2="14" y2="14" />
							<line className="cross-mark-line" x1="14" y1="2" x2="2.5" y2="14" />
						</svg>
					</div>
				</form>
			</div>
		)
	}
	
	return(
		<div className="team-name">
			{teamName}
			<div className={pencilClassName} onClick={toggleEdit}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={editFill} className="bi bi-pencil" viewBox="0 0 16 16">
				  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
				</svg>
			</div>
		</div>
	)
}