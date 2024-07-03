import TeamListTab from "./Components/TeamListTab";
import TeamScreen from "./Components/TeamScreen";
import CharacterModal from "./Components/CharacterModal";
import './Styles/stylesIndex.css';
import { useState, createContext } from "react";

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
	
	const [teams, setTeams] = useState([test, test1, test2]);
	
	function addToList(){
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
	
  return (
		<UserContext.Provider  value={{previewTeam, teams, setTeams, setTeam, addToList, toggleTeamActive, currentTeamID: team.id, setModalActive}}>
			<div className="body-wrapper">
				<TeamListTab />
				<TeamScreen currentTeam={team} delete={deleteFromList}/>
				{ modalActive ? 
					(<CharacterModal />) :
					(<></>)	
				}
			</div>
		</UserContext.Provider>
  );
}


