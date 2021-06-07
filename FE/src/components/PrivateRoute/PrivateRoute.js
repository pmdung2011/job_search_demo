import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { routes } from '../../share/constant';

export default function PrivateRoute(props) {
	if (!props.user) {
		return <Redirect to={routes.LOGIN} />;
	}

	return <Route {...props} />;
}
