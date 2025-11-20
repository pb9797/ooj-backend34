
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../controllers/upload');
const members = require('../controllers/members');
const apps = require('../controllers/applications');
const anns = require('../controllers/announcements');
const gallery = require('../controllers/gallery');
const leadership = require('../controllers/leadership');
const homepage = require('../controllers/homepage');
const rules = require('../controllers/rules');
const programs = require('../controllers/programs');
const authctrl = require('../controllers/auth');

// public
router.get('/members/public', members.listPublic);
router.post('/api/applications', apps.create);
router.get('/announcements', anns.list);
router.get('/gallery', gallery.list);
router.get('/leadership', leadership.list);
router.get('/homepage', homepage.get);
router.get('/programs', programs.list);
router.get('/rules', rules.get);

// auth
router.post('/auth/login', authctrl.login);

// admin protected
router.get('/members', auth, members.list);
router.post('/members/import', auth, members.import);
router.post('/members/update', auth, members.update);

router.get('/applications', auth, apps.list);
router.post('/api/applications/:id/approve', auth, apps.approve);

router.post('/announcements', auth, anns.create);
router.post('/gallery', auth, upload.single('photo'), gallery.create);
router.post('/leadership', auth, upload.single('photo'), leadership.create);
router.post('/homepage', auth, homepage.save);
router.post('/rules', auth, rules.save);
router.post('/programs', auth, programs.create);

module.exports = router;
