import React, { useEffect, useState } from 'react';

import './AllJobs.css';
import axios from '../../share/baseAxios';
import JobItem from './JobItem';
import { Button, Form } from 'react-bootstrap';

export default function AllJobs(props) {
	const [jobs, setJobs] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [category, setCategory] = useState('title');

	useEffect(() => {
		axios
			.get('/jobs')
			.then((res) => {
				setJobs(res.data.jobs);
			})
			.catch(console.log);
	}, [props]);

	const deleteJob = (id) => {
		setJobs((oldJobs) => {
			return oldJobs.filter((job) => job.id !== id);
		});
	};

	const submitSearch = (e) => {
		e.preventDefault();

		axios
			.get(`/jobs/search?searchValue=${searchValue}&category=${category}`)
			.then((res) => {
				console.log(res);
				setJobs(res.data.jobs);
			})
			.catch(console.log);
	};

	return (
		<div className="all-jobs-page">
			<h1>All jobs page</h1>
			<Form inline onSubmit={submitSearch}>
				<Form.Group controlId="formBasicEmail">
					<Form.Control
						value={searchValue}
						name="description"
						onChange={(e) => setSearchValue(e.target.value)}
						type="text"
						placeholder="Search"
					/>
				</Form.Group>
				<Form.Control
					as="select"
					className="mx-2"
					id="inlineFormCustomSelectPref"
					custom
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="title">Title</option>
					<option value="company_name">Company name</option>
					<option value="location">Location</option>
				</Form.Control>
				<Button type="submit" className="my-1">
					Search
				</Button>
			</Form>

			{jobs.map((job) => {
				return (
					<JobItem
						key={job.title}
						job={job}
						name={job.name}
						deleteJob={deleteJob}
            user={props.user}
					/>
				);
			})}

			{!jobs.length && <h1>No job found!</h1>}
		</div>
	);
}

// Alljob -> JobItem
