//import './Styles/stylesIndex.css';
import GenshinPage from "./Pages/GenshinPage";
import AzurLanePage from "./Pages/AzurLanePage";
import WutheringWavesPage from "./Pages/WutheringWavesPage";
import { useState, useEffect , createContext, useCallback } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    /*Link,*/
    useNavigate,
} from "react-router-dom";

export const SiteContext = createContext();

function Home(){
	const navigate = useNavigate();
	
	return(
		<div>
			<h1> Home Page </h1>
			
			<ul>
				<li onClick={() => {
					navigate("/GenshinImpact");
				}}>
					Genshin Impact Team Maker
				</li>
				
				<li onClick={() => {
					navigate("/AzurLane");
				}}>
				Azur Lane Team Maker
				</li>
				<li onClick={() => {
					navigate("/WutheringWaves");
				}}>
				Wuthering Waves Team Maker
				</li>
			</ul>
		</div>
	)
}

export default function App() {
	function getFromLocalStorage(){
		let currSite = window.location.href.split("/")[3];
		//console.log(currSite);
		let storedTeams  = JSON.parse(localStorage.getItem(currSite + "Teams"));
		
		if(storedTeams === undefined || storedTeams === null || storedTeams === "undefined") {
			console.log("No " + currSite +  " teams found");
			return [];
		}
		storedTeams = storedTeams.map(team =>{
			return {...team, active: false}
		});
		//console.log(storedTeams);
		return storedTeams;
	}
	
	const [teams, setTeams] = useState(() => getFromLocalStorage());
	
	useEffect(() => {
		//console.log("saved: " + teams);
		let currSite = window.location.href.split("/")[3];
		localStorage.setItem(currSite + "Teams", JSON.stringify(teams));
	}, [teams]);	
	
	const setFromLocalStorage = useCallback(() =>{
		setTeams(() => getFromLocalStorage());
	}, []);
	
	
	function addToList(){
		//console.log(teams);
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
		console.log("here");
		console.log(teamStats);
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
		previewTeam, setTeam, teams, setTeams,
		addToList, toggleTeamActive, currentTeamID: team.id,
		setModalActive, modalActive ,team, openModal,
		saveTeam, deleteFromList, currentEditingCharacter,
		currentEditingPosition
	}
	
	return (
		<SiteContext.Provider value={value}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/GenshinImpact" element={<GenshinPage currSite={"Genshin Impact"} setFromLocal={setFromLocalStorage}/>} />
					<Route path="/AzurLane" element={<AzurLanePage currSite={"Azur Lane"} setFromLocal={setFromLocalStorage}/>} />
					<Route path="/WutheringWaves" element={<WutheringWavesPage currSite={"Wuthering Waves"} setFromLocal={setFromLocalStorage}/>} />
				</Routes>
			</Router>
		</SiteContext.Provider>
	);
}
