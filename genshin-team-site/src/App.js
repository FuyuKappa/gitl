import TeamListTab from "./Components/TeamListTab";
import TeamScreen from "./Components/TeamScreen";
import CharacterModal from "./Components/CharacterModal";
import './Styles/stylesIndex.css';
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export default function App() {
	let test = {
		name: "Team 1",
		id: crypto.randomUUID(),
		characters: [
			"Hu Tao",
			"Yanfei",
			"Yelan",
			"Barbara"
		],
		notes:[
			"This HU tao",
			"This is Yanfei, she hits",
			"Yelan is vape support",
			"Barbara keeps the team alive"
		],
		description: "This is the best team.",
		rotation: "Yelan E Q > Barbara E > Hu Tao E Then NC any amount of times hell yeah",
		active: false
	}
	let test1 = {
		name: "Team 2",
		id: crypto.randomUUID(),
		characters: [
			"Ganyu",
			"Hu Tao",
			"Raiden Shogun",
			"Barbara"
		],
		notes:[
			"Ganyu is cryo",
			"Hu Tao will melt",
			"Raiden is skill support",
			"Barbara keeps the team alive"
		],
		description: "This is a test team. But technically this is a melt comp with ganyu as the off-field cryo applier.",
		rotation: "This team rotates",
		active: false
	}
	let test2 = {
		name: "New Team",
		id: crypto.randomUUID(),
		characters: [
			"Wriothesley",
			"",
			"Al Haitham",
			"Barbara"
		],
		notes:[
			"This is just a test",
			"",
			"Barbara will be blank",
			""
		],
		description: "This is a test team with a blank character",
		rotation: "This team CANNOT rotate.",
		active: false		
	}

	const [teams, setTeams] = useState(() =>{
		console.log("Attempting to read local storage");
		
		let storedTeams  = JSON.parse(localStorage.getItem("genshinTeams"));
		console.log(storedTeams);
		if(storedTeams === undefined || storedTeams === null || storedTeams === "undefined") {
			console.log("No genshin teams found");
			storedTeams = [];
		}
		console.log(storedTeams);
		return storedTeams;
	});
	
	useEffect(() => {
		
		
		localStorage.setItem("genshinTeams", JSON.stringify(teams));
	}, [teams]);	
	
	function saveToLocalStorage(){
		//localStorage.setItem("genshinTeams", teams)
	}
	
	function addToList(){
		console.log(teams);
		const newTeam = { name: "New Team", id: crypto.randomUUID(), characters: [], notes: ["","","",""], description: "", rotation: "", active: true };
		setTeams(() => { return [...teams, newTeam]});
		saveToLocalStorage();
		previewTeam(newTeam);
		toggleTeamActive(newTeam.id);
	}
	
	function deleteFromList(id){
		setTeams(currentTeams => {
			return currentTeams.filter(team => team.id !== id);
		});
		saveToLocalStorage();
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
	
	const value={
		previewTeam, teams, setTeams, setTeam,
		addToList, toggleTeamActive, currentTeamID: team.id,
		setModalActive, team, openModal, saveToLocalStorage
	}
	
  return (
		<UserContext.Provider  value={value}>
			<div className="body-wrapper">
				<TeamListTab />
				<TeamScreen currentTeam={team} delete={deleteFromList}/>
				{ modalActive ? 
					(<CharacterModal character={currentEditingCharacter} position={currentEditingPosition}/>) :
					(<></>)	
				}
			</div>
		</UserContext.Provider>
  );
}


