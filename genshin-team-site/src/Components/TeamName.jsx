import { useState } from 'react';

export default function TeamName({teamName}){	
	return(
		<>
			<div className="team-name">
				{teamName}
			</div>
			<hr style={{margin: '4px 8px'}}/>
		</>
	)
}