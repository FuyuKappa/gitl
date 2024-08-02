import {default as Section} from "./TeamListSection";
//import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

export default function TeamListTab(){
	{/*
	function resetHeight(){
		let height = window.innerHeight + "px";
		document.body.style.height = height;
		useEffect(() => {
			document.querySelector(".team-list-tab").style.height = height;
		});
	}

	window.addEventListener("resize", resetHeight);
	resetHeight();*/}
	const teamCount = useContext(UserContext).teams.length;
	return(
		//This tab will be the one moving left and right
		<div className="team-list-tab">
			<div className="team-list-header">
				<span className="team-list-header-label">Teams</span>
				<span className="team-list-header-counter">
				{ teamCount ? teamCount: "No teams found" }</span>
			</div>
			<hr />
			<Section />
		</div>
	)
}