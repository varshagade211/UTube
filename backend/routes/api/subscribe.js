const express = require('express')
const router= express.Router()
const {requireAuth} = require('../../utils/auth')
const { User , Subscribe} = require('../../db/models')
const {Op} = require("sequelize")



// get all subscribed user of current user
router.get('/',requireAuth, async(req,res,next) => {
    let subscriber = await Subscribe.findAll(
      {where:{
        subscriberId:req.user.id,


    }})

    let subscribee = []
    for(let i=0; i<subscriber.length; i++){
        let user = await User.findByPk(subscriber[i].subscribeeId)
        subscribee.push(user)
    }

    return res.status(200).json({subscribee:subscribee})

  })


// subscribe user
router.post('/:subscribeeId', requireAuth, async(req,res,next) => {
    let subscribee = await User.findByPk(req.params.subscribeeId)

    if(!subscribee){
        const err = new Error("User couldn't be found");
         err.statusCode = 404;
         return next(err);
     }
    let foundSubscribee = await Subscribe.findOne({
        where:{
            [Op.and]:[
              { subscriberId:req.user.id},
               {subscribeeId:req.params.subscribeeId,},
            ],


        }
    })
    if(!foundSubscribee){
        const subscriber = await Subscribe.create({
           subscriberId:req.user.id,
           subscribeeId:req.params.subscribeeId,
       })
       let subscribee = await User.findByPk(subscriber.subscribeeId)

       return res.status(200).json({subscribee:subscribee})
    }else{
        let subscribee = await User.findByPk(foundSubscribee.subscribeeId)
        return res.status(200).json({subscribee:subscribee})
    }
  })


// unsubscribe user
 router.delete('/:subscribeeId', requireAuth, async(req,res,next) => {
    let subscribee = await User.findByPk(req.params.subscribeeId)

    if(!subscribee){
        const err = new Error("User couldn't be found");
         err.statusCode = 404;
         return next(err);
     }
     let foundSubscribee = await Subscribe.findOne({
        where:{
            [Op.and]:[
              { subscriberId:req.user.id},
               {subscribeeId:req.params.subscribeeId},
            ]

        }
    })
     if(foundSubscribee){
        foundSubscribee.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            foundSubscribee:foundSubscribee,
            statusCode: 200
        })

     }
     const err = new Error("User couldn't be found");
     err.statusCode = 404;
     return next(err);
})


module.exports = router;
