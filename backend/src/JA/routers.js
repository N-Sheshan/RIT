const {Router} =require('express');
const controller = require('./controller');
const router = Router();

router.get('/',controller.getcoursedata);
router.post('/',controller.addcoursdata);
router.get('/university_mark',controller.get_university_mark);
router.post('/university_mark',controller.add_university_mark_data);
router.post('/erp_student_master',controller.add_erp_student_master);
router.post('/twelveth_Stateboard_mark',controller.add_12th_Stateboard_mark);
router.post('/twelveth_icse_cbsc_mark',controller.add_12th_icse_cbsc_mark);
router.post('/twelveth_vocational_mark',controller.add_12th_vocational_mark);

module.exports = router;
