const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const Furniture = require('../../models/Furniture');
const User = require('../../models/User');

router.post('/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, password} = req.body;
        
        try{
            const user = await User.findById(req.user.id);

            const newFurniture = new Furniture({
                name: req.body.name,
                description: req.body.description,
                user: req.user.id
            });
            
            const furniture = await newFurniture.save();
            res.json(furniture);

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    router.get('/', auth, async (req, res) => {
        try{
            const furnitures = await Furniture.find().sort({date: -1});
            res.json(furnitures);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    router.get('/:id', auth, async (req, res) => {
        try{
            const furniture1 = await Furniture.findById(req.params.id);

            if(!furniture1){
                return res.status(404).json({ msg: 'Furniture Not Found' });
            }

            res.json(furniture1);
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectID'){
                return res.status(404).json({ msg: 'Furniture Not Found' });
            }
            res.status(500).send('Server error');
        }
    });

    router.delete('/:id', auth, async (req, res) => {
        try{
            const furniture1 = await Furniture.findById(req.params.id);

            if(!furniture1){
                return res.status(404).json({ msg: 'Furniture Not Found' });
            }

            if(furniture1.user.toString() != req.user.id){
                return res.status(401).json({ msg: 'User not authorized' });
            }

            await furniture1.remove();

            res.json({ msg: "Furniture removed" });
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectID'){
                return res.status(404).json({ msg: 'Furniture Not Found' });
            }
            res.status(500).send('Server error');
        }
    });


    router.get('/search/:word', auth, async (req, res) => {
        try{
            var colName="v";
            Furniture.find({ "name": { $regex: '.*' + req.params.word + '.*' } },
            function(err,data){
                if(data.length == 0){
                    return res.status(404).json({ msg: 'Furniture Not Found' });
                }
                res.json(data);
            });

            
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectID'){
                return res.status(404).json({ msg: 'Furniture Not Found' });
            }
            res.status(500).send('Server error');
        }
    });

module.exports = router;