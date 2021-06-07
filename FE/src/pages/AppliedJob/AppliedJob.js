import React, { useEffect } from 'react';

import axios from '../../share/baseAxios';

export default function AppliedJob() {
	useEffect(() => {
		axios
			.get('/jobs/applied-jobs')
			.then((res) => {
				console.log(res);
			})
			.catch(console.log);
	});
	return (
		<div>
			<h1>Applied Job page</h1>
		</div>
	);
}
