import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Header.css';
import { routes } from '../../share/constant';

export default function Header(props) {
	return (
		<div className="header">
			<ul>
				<li>
					<NavLink to={routes.ALL_JOBS}>Home</NavLink>
				</li>
				{props.user && !!(props.user.role === 'ADMIN') && (
					<li>
						<NavLink to={routes.ADD_JOB}>Add Job</NavLink>
					</li>
				)}
				{props.user && !!(props.user.role === 'USER') && (
					<li>
						<NavLink to={routes.JOBS_APPLIED}>All job applied</NavLink>
					</li>
				)}
			</ul>

			{!!props.user && (
				<Button className="logout-btn" color="primary" onClick={props.logout}>
					Logout
				</Button>
			)}
		</div>
	);
}
