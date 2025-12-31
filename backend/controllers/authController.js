const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../config/db');

console.log('authController chargé');

module.exports.register = (req, res) => {
  console.log('Route API register appelée');
  const { nom, prenom, email, password, tel } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Champs obligatoires manquants.' });
  }

  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error('Erreur SQL check:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erreur serveur.' });
    }

    if (results.length > 0) {
      console.log('Email déjà utilisé:', email);
      return res
        .status(409)
        .json({ success: false, message: 'Email déjà utilisé.' });
    }

    bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Erreur hash:', hashErr);
        return res
          .status(500)
          .json({ success: false, message: 'Erreur serveur.' });
      }

      const insertSql = `
        INSERT INTO users (nom, prenom, email, password, tel, joined_at, roles_id)
        VALUES (?, ?, ?, ?, ?, NOW(), 1)
      `;
      db.query(
        insertSql,
        [nom, prenom, email, hashedPassword, tel || ''],
        (insertErr, result) => {
          if (insertErr) {
            console.error('Erreur SQL insert:', insertErr);
            return res
              .status(500)
              .json({ success: false, message: 'Erreur serveur.' });
          }

          console.log('✅ Étudiant créé:', result.insertId);
          return res.status(201).json({
            success: true,
            message: 'Compte créé avec succès.',
            userId: result.insertId,
          });
        }
      );
    });
  });
};

module.exports.pregister = (req, res) => {
  console.log('Route API pregister appelée');
  const { nom, prenom, email, password, tel } = req.body;

  if (!nom || !prenom || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Champs obligatoires manquants.' });
  }

  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error('Erreur SQL check:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erreur serveur.' });
    }

    if (results.length > 0) {
      console.log('Email déjà utilisé:', email);
      return res
        .status(409)
        .json({ success: false, message: 'Email déjà utilisé.' });
    }

    bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Erreur hash:', hashErr);
        return res
          .status(500)
          .json({ success: false, message: 'Erreur serveur.' });
      }

      const insertSql = `
        INSERT INTO users (nom, prenom, email, password, tel, joined_at, roles_id)
        VALUES (?, ?, ?, ?, ?, NOW(), 2)
      `;
      db.query(
        insertSql,
        [nom, prenom, email, hashedPassword, tel || ''],
        (insertErr, result) => {
          if (insertErr) {
            console.error('Erreur SQL insert:', insertErr);
            return res
              .status(500)
              .json({ success: false, message: 'Erreur serveur.' });
          }

          console.log('✅ Prof créé:', result.insertId);
          return res.status(201).json({
            success: true,
            message: 'Compte professeur créé avec succès.',
            userId: result.insertId,
          });
        }
      );
    });
  });
};

module.exports.login = (req, res) => {
  console.log('Route API login appelée');
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email et mot de passe requis.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Erreur serveur.' });
    }

    if (results.length === 0) {
      console.log('Email non trouvé');
      return res
        .status(401)
        .json({ success: false, message: 'Email non trouvé.' });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('Résultat compare:', isPasswordMatch);

    if (!isPasswordMatch) {
      console.log('Mot de passe incorrect');
      return res
        .status(401)
        .json({ success: false, message: 'Mot de passe incorrect.' });
    }

    req.session.user = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel || '',
      joined_at: user.joined_at,
      roles_id: user.roles_id,
    };

    console.log('✅ Login étudiant réussi');
    console.log('SESSION', req.session.user);

    return res.json({
      success: true,
      message: 'Connexion réussie.',
      user: req.session.user,
    });
  });
};


module.exports.getUserInfo = (req, res) => {
  if (!req.session || !req.session.user) {
    return res
      .status(401)
      .json({ success: false, message: 'Non connecté' });
  }

  console.log('✅ User info demandé:', req.session.user);
  res.json({
    success: true,
    user: req.session.user,
  });
};
