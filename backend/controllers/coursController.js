// backend/controllers/coursController.js
const db = require('../config/db');

// Récupérer toutes les catégories
module.exports.getCategories = (req, res) => {
    const sql = 'SELECT id, nom_cat, desc_cat FROM categories ORDER BY nom_cat';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Erreur catégories:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur BDD catégories' 
            });
        }
        res.json({ 
            success: true, 
            categories: results 
        });
    });
};

// Créer un nouveau cours
module.exports.cours = (req, res) => {
    console.log("📤 Route cours POST appelée:", req.body);
    console.log('SESSION USER:', req.session.user);

    const { 
        titre_cours, 
        desc_cours, 
        prix, 
        duree_minutes, 
        pre_requis, 
        categories_id, 
        niveau_id,
        date_publication
    } = req.body;

    // Vérifier la session utilisateur
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ 
            success: false, 
            message: 'Non authentifié' 
        });
    }

    const users_id = req.session.user.id;

    // Validation des champs requis
    if (!titre_cours || !prix || !duree_minutes || !pre_requis || !categories_id) {
        return res.status(400).json({ 
            success: false, 
            message: 'Tous les champs obligatoires doivent être remplis' 
        });
    }

    // Vérifier si le cours existe déjà
    const checkSql = "SELECT id FROM cours WHERE titre_cours = ? AND users_id = ?";
    db.query(checkSql, [titre_cours, users_id], (err, results) => {
        if (err) {
            console.error("❌ Erreur SQL check:", err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur serveur' 
            });
        }

        if (results.length > 0) {
            console.log("❌ Cours existe déjà:", titre_cours);
            return res.status(400).json({ 
                success: false, 
                message: 'Un cours avec ce titre existe déjà' 
            });
        }

        // Insérer le nouveau cours
        const insertSql = `
            INSERT INTO cours (
                titre_cours, desc_cours, prix, duree_minutes, 
                date_publication, pre_requis, total_etudiants, 
                note_moyenne, categories_id, niveau_id, users_id
            ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?)
        `;

        const values = [
            titre_cours, 
            desc_cours || '', 
            prix, 
            duree_minutes, 
            date_publication || new Date().toISOString(),
            pre_requis, 
            categories_id, 
            niveau_id || 1,
            users_id
        ];

        console.log("🔄 Insertion cours, values =", values);

        db.query(insertSql, values, (insertErr, result) => {
            if (insertErr) {
                console.error("❌ Erreur SQL insert:", insertErr.code, insertErr.message);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Erreur lors de la création du cours' 
                });
            }

            console.log("✅ Cours créé ID:", result.insertId);
            res.json({ 
                success: true, 
                message: 'Cours créé avec succès',
                coursId: result.insertId
            });
        });
    });
};

// Récupérer les cours d'un professeur
module.exports.getCoursProf = (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ 
            success: false, 
            message: 'Non authentifié' 
        });
    }

    const users_id = req.session.user.id;

    const sql = `
        SELECT 
            c.id, 
            c.titre_cours, 
            c.desc_cours, 
            c.prix, 
            c.duree_minutes, 
            c.date_publication, 
            c.note_moyenne, 
            c.total_etudiants,
            c.pre_requis,
            cat.nom_cat as categorie,
            n.nom as niveau
        FROM cours c
        LEFT JOIN categories cat ON c.categories_id = cat.id
        LEFT JOIN niveau n ON c.niveau_id = n.id
        WHERE c.users_id = ?
        ORDER BY c.date_publication DESC
    `;
    
    db.query(sql, [users_id], (err, results) => {
        if (err) {
            console.error('❌ Erreur getCoursProf:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur BDD cours' 
            });
        }
        res.json({ 
            success: true, 
            cours: results 
        });
    });
};

// Récupérer tous les cours (pour les étudiants)
module.exports.getTousCours = (req, res) => {
    const sql = `
        SELECT 
            c.id, 
            c.titre_cours, 
            c.desc_cours, 
            c.prix, 
            c.duree_minutes, 
            c.date_publication, 
            c.note_moyenne, 
            c.total_etudiants,
            cat.nom_cat as categorie,
            n.nom as niveau,
            CONCAT(u.prenom, ' ', u.nom) as professeur
        FROM cours c
        LEFT JOIN categories cat ON c.categories_id = cat.id
        LEFT JOIN niveau n ON c.niveau_id = n.id
        LEFT JOIN users u ON c.users_id = u.id
        WHERE c.date_publication <= NOW()
        ORDER BY c.date_publication DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('❌ Erreur getTousCours:', err);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur BDD cours' 
            });
        }
        res.json({ 
            success: true, 
            cours: results 
        });
    });
};