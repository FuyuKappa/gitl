import MediaQuery from 'react-responsive';
import { SiteContext } from "../App"
import { useContext } from "react";

export default function SiteHeader({currentSite, switchPreference}){
	const context = useContext(SiteContext);
	const className = "teams-toggle teams-toggle-" + context.showTeams;
	
	function GenshinTravelerPreferenceSet(){
		let traveler;
		localStorage.getItem("TravelerPreference") === "M" ? traveler = "Male" : traveler = "Female";
		return(
			<div className="preference-toggle" onClick={() => switchPreference()}>
				Traveler: {traveler}
			</div>
		);
	}
	
	function ExportData(){
		let download = document.createElement("a");
		let path = currentSite.replace(/ /g,"") + "Teams"; 
		let jsonFile = new Blob([localStorage.getItem(path)], { type: "text/plain" }); 
		
		download.href = URL.createObjectURL(jsonFile);
		download.download = path + ".json"
		download.click();
		
		download.remove();
		
	}
	
	function ImportData(){
				
	}
	
	return(
		<div className="site-header">
			<div className="site-header-left">
				<MediaQuery maxWidth={1419}>
				  <div className={className} onClick={() => {context.setShowTeams(() => !context.showTeams);
				  context.setModalActive(false); context.saveTeam({notifyUser:false, switchTeams:false})}}>
					Teams
				  </div>
				</MediaQuery>
				{currentSite}
				{ currentSite === "Genshin Impact" ? <GenshinTravelerPreferenceSet /> : <></>}
			</div>
			<div className="site-header-right">
				<span onClick = {() => ImportData()}>Import Data |</span>
				<span onClick = {() => ExportData()}> Export Data </span>
				<a href="/" style={{"float":"right", "position":"relative"}}> Home</a>
			</div>
		</div>
	);
}