var express = require('express');
var router = express.Router();
const leadController = require('../../../controllers/api/v1/index');

/* GET home page. */
router.get('/leads/:lead_id', leadController.getLeadById);
router.post('/leads/', leadController.createLead);
router.put('/leads/:lead_id', leadController.updateLead);
router.delete('/leads/:lead_id', leadController.removeLead);
router.put('/mark_lead/:lead_id', leadController.markLead);
module.exports = router;
