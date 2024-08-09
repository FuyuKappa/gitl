import TeamListTab from "./Components/TeamListTab";
import TeamScreen from "./Components/TeamScreen";
import CharacterModal from "./Components/CharacterModal";
import Header from "./Components/SiteHeader";
import './Styles/stylesIndex.css';
import { useState, createContext, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';

export const UserContext = createContext();

export default function App() {
	const [teams, setTeams] = useState(() =>{
		
		let storedTeams  = JSON.parse(localStorage.getItem("genshinTeams"));

		if(storedTeams === undefined || storedTeams === null || storedTeams === "undefined") {
			console.log("No genshin teams found");
			return [];
		}
		storedTeams = storedTeams.map(team =>{
			return {...team, active: false}
		});

		return storedTeams;
	});
	
	useEffect(() => {
		localStorage.setItem("genshinTeams", JSON.stringify(teams));
	}, [teams]);	
	
	function addToList(){
		console.log(teams);
		const newTeam = { name: "New Team", id: crypto.randomUUID(), characters: [], notes: ["","","",""], description: "", rotation: "", active: true };
		setTeams(() => { return [...teams, newTeam]});
		previewTeam(newTeam);
		toggleTeamActive(newTeam.id);
	}
	
	function deleteFromList(id){
		setTeams(currentTeams => {
			return currentTeams.filter(team => team.id !== id);
		});
		previewTeam({});
	}
	
	function toggleTeamActive(id){
		setTeams(currentTeams =>{
			return currentTeams.map(team => {
				if(team.id === id){
					return { ...team, active: true}
				}
				
				return {...team, active: false}
			})
		})
	}
	
	const [team, setTeam] = useState({});
	
	function previewTeam(teamStats){
		setTeam(teamStats);
	}
	
	const [modalActive, setModalActive] = useState(false);
	const [currentEditingCharacter, setEditingCharacter] = useState("");
	const [currentEditingPosition, setEditingPosition] = useState(0);
	
	function openModal(currentCharacter, position){
		setEditingCharacter(currentCharacter);
		setEditingPosition(position);
		setModalActive(true);
	}
		
	const [showTeams, setShowTeams] = useState(false);
	const isSmallerThan_1419 = useMediaQuery({ maxWidth: 1419 });
	
	function toggleTeamList(){
		if((isSmallerThan_1419 && showTeams) || !isSmallerThan_1419) //render if showTeams is true and smaller than 1419. Render if bigger than 1419
			return <TeamListTab />;
		else
			return <></>;
	}
	
	function saveTeam(options = {}){
		if(Object.keys(team).length === 0) return;
			
			
		let switchActive = options.switchActive !== undefined ? options.switchActive : true;
		let notifyUser = options.notifyUser !== undefined ? options.notifyUser : true;
		console.log(notifyUser);
		if(notifyUser) alert("Team saved!");
		
		let noteForms = document.querySelectorAll(".notes-form");
		let notes = [];
		for(let i = 0; i < 4; i++){
			notes[i]  = noteForms[i].value.trim();
		}
		let description = document.querySelector(".description-text").value.trim();
		let rotation = document.querySelector(".rotation-text").value.trim();
		
		setTeams(currentTeams=>{
			return currentTeams.map((currentTeam) =>{
				if(currentTeam.id === team.id)
					return {...team, notes: notes, description: description, rotation: rotation}
				return currentTeam;
			}) 
		})
		
		//update the team screen
		setTeam(() => {return {...team, notes: notes, description: description, rotation: rotation}});

		//update the active
		if(switchActive) toggleTeamActive(team.id);
	}
	
	const value={
		previewTeam, teams, setTeams, setTeam,
		addToList, toggleTeamActive, currentTeamID: team.id,
		setModalActive, modalActive ,team, openModal, setShowTeams, showTeams,
		saveTeam
	}
  return (
		<UserContext.Provider  value={value}>
			<div className="body-wrapper">
				<Header setShowTeams={setShowTeams} showTeams={showTeams} setModalActive={setModalActive} saveTeam={saveTeam}/>
				<div className="content-wrapper">
					{toggleTeamList()}
					<TeamScreen currentTeam={team} delete={deleteFromList}/>
					{ modalActive ? 
						(<CharacterModal character={currentEditingCharacter} position={currentEditingPosition}/>) :
						(<></>)	
					}
				</div>
			</div>
		</UserContext.Provider>
  );
}


