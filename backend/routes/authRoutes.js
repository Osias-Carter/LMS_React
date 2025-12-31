// backend/routes/authRoutes.js
const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// Auth étudiant (API JSON)
router.post('/register', authController.register);
router.post('/login', authController.login);



// Infos utilisateur connecté (session)
router.get('/user-info', authController.getUserInfo);

router.get('/getUserSession', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Non connecté' });
  }
  res.json({ success: true, user: req.session.user });
  console.log('routes true');
});

module.exports = router;
