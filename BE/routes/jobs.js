const router = require('express').Router();

const jobController = require('../controllers/job');
const { verifyToken } = require('../middleware/jwt');

router.use(verifyToken);

// /jobs/
router.get('/', jobController.getJobs);

// router.get('/lastest-job')

router.get('/search', jobController.searchJob);

router.get('/applied-jobs/:id', jobController.getAppliedJobByUserId);

router.get(
	'/user-applied-job/:idJob',
	/*checkAdminRole,*/ jobController.getUserApplied,
);

router.get('/:id', jobController.getJobById);

router.put('/:id', jobController.putJobById);

router.delete('/:id', jobController.deleteJobById);

router.post('/new-job', jobController.postJob);

router.post('/apply-job/:id', jobController.postApplyJob);

// /job/all-jobs
// router.get('/all-jobs')

module.exports = router;
