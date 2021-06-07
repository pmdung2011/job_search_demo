const { response } = require('express')
const createError = require('http-errors')

const Job = require('../model/job')

exports.postJob = async (req, res, next) => {
  const { companyName, location, title, description } = req.body

  const job = new Job(companyName, title, location, description)

  try {
    const [result] = await job.save()

    // console.log(
    //   '🚀 ~ file: job.js ~ line 9 ~ exports.postJob= ~ result',
    //   result
    // )
    // response.json('ok')
  } catch (e) {
    console.log(e)
  }

  res.json('ok')
}

exports.getJobs = async (req, res, next) => {
  const [jobs] = await Job.getJobs()

  res.json({ jobs })
}

exports.getJobById = async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = req.user
  const { checkIsApplied } = req.query

  try {
    const [job] = await Job.getJobById(id)

    if (!job.length) {
      return next(createError(404, 'Job not found'))
    }

    const responseData = { job }

    if (checkIsApplied) {
      const [result] = await Job.checkIsApply(userId, id)
      responseData.isApplied = !!result.length
    }

    res.json(responseData)
  } catch (e) {
    console.log('🚀 ~ file: job.js ~ line 34 ~ exports.getJobById= ~ e', e)
    next(e)
  }
}

//service

exports.putJobById = async (req, res, next) => {
  const { id } = req.params
  const putData = req.body

  try {
    await Job.putJobById(id, putData)

    res.json({ message: 'Success' })
  } catch (e) {
    console.log('🚀 ~ file: job.js ~ line 34 ~ exports.getJobById= ~ e', e)
    next(e)
  }
}

exports.deleteJobById = async (req, res, next) => {
  const { id } = req.params

  try {
    await Job.deleteJobById(id)

    res.json({ message: 'Success' })
  } catch (e) {
    console.log('🚀 ~ file: job.js ~ line 34 ~ exports.getJobById= ~ e', e)
    next(e)
  }
}

// /jobs/search?value=awekfahw&category=awjhefkajh
exports.searchJob = async (req, res, next) => {
  const { searchValue, category } = req.query

  try {
    const [jobs] = await Job.searchJob(searchValue, category)
    res.json({ jobs })
  } catch (e) {
    console.log('🚀 ~ file: job.js ~ line 34 ~ exports.getJobById= ~ e', e)
    next(e)
  }
}

exports.postApplyJob = async (req, res, next) => {
  const { id: idJob } = req.params
  const { id: idUser } = req.user

  try {
    await Job.applyJob(idUser, idJob)
    res.json('ok')
  } catch (e) {
    return next(e)
  }
}

exports.getAppliedJobByUserId = async (req, res, next) => {
  const { id: idUser } = req.user

  try {
    const [jobs] = await Job.getAppliedJobByUserId(idUser)
    res.json({ jobs })
  } catch (e) {
    next(e)
  }
}

exports.getUserApplied = async (req, res, next) => {
  const { idJob } = req.params

  try {
    const [users] = await Job.getUserAppliedById(idJob)

    res.json({ users })
  } catch (e) {
    next(e)
  }
}
