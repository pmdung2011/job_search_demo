import React, { useEffect, useState } from 'react'

import axios from '../../share/baseAxios'
import JobItem from '../AllJobs/JobItem'

export default function AppliedJob(props) {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios
      .get('/jobs/applied-jobs')
      .then(res => {
        // console.log(res)
        setJobs(res.data.users)
      })
      .catch(console.log)
  }, []) //[] run one time after rendered 1st time
  return (
    <div>
      <h1>Applied Job page</h1>
      {jobs.map(job => {
        return <JobItem key={job.title} job={job} name={job.name} />
      })}
    </div>
  )
}
