const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const UserFurnitures = require('../../models/UserFurniture');
const User = require('../../models/User');
router.post('/',
    [
        auth,
        []
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        try{
            const user = await User.findById(req.user.id);

            const newFurniture = new UserFurnitures({
                user: req.body.id,
                furniture: req.body.furniture_id,
            });
            
            const furniture = await newFurniture.save();
            res.json(furniture);

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });
    module.exports = router;