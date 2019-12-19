const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const Furnitures = require('../../models/Furnitures');

router.post('/',
    [
        auth,
        [
            check('name', 'Name is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('price', 'Price is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        
        try{

            const newFurniture = new Furnitures({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            });
            
            const furniture = await newFurniture.save();
            res.json(furniture);

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    router.get('/', async (req, res) => {
        try{
            const furnitures = await Furnitures.find().sort({date: -1});
            res.json(furnitures);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });


    router.get('/:id', async (req, res) => {
        try{
            const furniture1 = await Furnitures.findById(req.params.id);

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

    router.get('/search/:word', async (req, res) => {
        try{
            var colName="v";
            Furnitures.find({ "name": { $regex: '.*' + req.params.word + '.*' } },
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