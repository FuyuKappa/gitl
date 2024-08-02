export default function ContainerCharacterPortrait({character, id, position}){
	return(
		<div className="container-character-portrait" >
			<img src={"./SideIcon/" + character + ".png"} alt={character}/>
			<div className="container-character-bg"></div>
		</div>
	)
}