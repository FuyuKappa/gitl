import {default as Section} from "./TeamListSection";
import {useEffect} from "react";

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
	
	return(
		//This tab will be the one moving left and right
		<div className="team-list-tab">
			Teams
			<hr />
			<Section />
		</div>
	)
}