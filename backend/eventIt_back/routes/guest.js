const express=require('express');
const _=require('lodash');
const router=express.Router();
const {Guest,validate_guest}=require('../models/guest');
const logger=require('../logger');

router.get('/',async(req,res)=>{
    const guests=await Guest.find();
    res.send(guests);

});

router.get('/:eventId',async(req,res)=>{
    const guest=await Guest.find({eventId:req.params.eventId});
    res.send(guest);
});


router.post('/',async (req,res)=>{
    const {error}=validate_guest(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let guest=await Guest.findOne({name:req.body.name});
    if(guest) return res.send('guest exists');

    guest=new Guest(_.pick(req.body,['name','description','tel','eventId']));
    await guest.save();
    res.send(guest);

});

router.put('/:id',async (req,res)=>{
    const result=await Guest.findOneAndUpdate({_id:req.params.id},{
        $set :{
            name: req.body.name,
            description:req.body.description,
            tel:req.body.date
        }
    });
    res.send(result);

});



module.exports=router;
