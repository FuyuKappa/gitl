export default function ContainerCharacterPortrait({character}){
	return(
		<div className="container-character-portrait">
			<img src={"./SideIcon/" + character + ".png"} />
			<div className="container-character-bg"></div>
		</div>
	)
}