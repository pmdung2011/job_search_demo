const router = require('express').Router()

const jobController = require('../controllers/job')
const { verifyToken, checkAdminRole } = require('../middleware/jwt')

router.use(verifyToken)

router.get('/', jobController.getJobs)

router.get('/search', jobController.searchJob)

router.get('/applied-jobs', jobController.getUserApplied)

router.get('/applied-jobs/:id', jobController.getAppliedJobByUserId)

router.get(
  '/user-applied-job/:idJob',
  checkAdminRole,
  jobController.getUserAppliedByJobId
)

router.get('/:id', jobController.getJobById)

router.put('/:id', checkAdminRole, jobController.putJobById)

router.delete('/:id', checkAdminRole, jobController.deleteJobById)

router.post('/new-job', checkAdminRole, jobController.postJob)

router.post('/apply-job/:id', jobController.postApplyJob)

module.exports = router
