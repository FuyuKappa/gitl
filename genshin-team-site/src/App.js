import TeamListTab from "./Components/TeamListTab";
import TeamScreen from "./Components/TeamScreen";
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
		active: false
	}
	let test1 = {
		name: "Team 2",
		id: crypto.randomUUID(),
		characters: [
			"Ganyu",
			"Hu Tao",
			"Yanfei",
			"Barbara"
		],
		active: false
	}
	let test2 = {
		name: "New Team",
		id: crypto.randomUUID(),
		characters: [
			"",
			"Hu Tao",
			"",
			"Barbara"
		],
		active: false		
	}
	
	const [teams, setTeams] = useState([test, test1, test2]);
	
	function addToList(){
		const newTeam = { name: "New Team", id: crypto.randomUUID(), characters: [], active: true };
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
	
  return (
		<UserContext.Provider  value={{previewTeam, teams, addToList, toggleTeamActive}}>
			<div className="body-wrapper">
				<TeamListTab />
				<TeamScreen currentTeam={team} delete={deleteFromList}/>
			</div>
		</UserContext.Provider>
  );
}


