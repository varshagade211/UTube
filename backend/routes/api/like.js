const express = require('express')
const router= express.Router()
const {requireAuth} = require('../../utils/auth')
const {Comment , Video, User,Like} = require('../../db/models')
// const { application } = require('express')
const {Op} = require("sequelize")


// get all likes for video by id
router.get('/:videoId', async(req,res,next) => {
  let likes = await Like.findAll(
    {where:{
        [Op.and]:[
            {videoId:req.params.videoId},
            {type:true}
        ]},

    }
    )

    let dislikes = await Like.findAll(
        {where:{
            [Op.and]:[
                {videoId:req.params.videoId},
                {type:false}
            ]},
        }
        )

  return res.status(200).json({likes:likes, dislikes:dislikes})

})



//   create like or create dislike
router.post('/:videoId', requireAuth, async(req,res,next) => {
    let video = await Video.findByPk(req.params.videoId)

    if(!video){
        const err = new Error("Video couldn't be found");
         err.statusCode = 404;
         return next(err);
     }
     let {type} = req.body
     let foundLike = await Like.findOne(
        {where:{
            [Op.and]:[
                {videoId:req.params.videoId},
                {likerId:req.user.id},
            ]}
        }
    )


    if(!foundLike){
        const like = await Like.create({
            likerId:req.user.id,
            videoId:req.params.videoId,
            likableType:'video',
            type:type
        })
        return res.status(200).json(like)
    } else {
        if (foundLike.type !== type) {
            return res.status(404).json({
                message: "Like couldn't be created",
                statusCode: 404
            })
        }
    }
    return res.status(200).json(foundLike)
})

//   delete like or  dislike
router.delete('/:videoId', requireAuth, async(req,res,next) => {
    let video = await Video.findByPk(req.params.videoId)
    if(!video){
        const err = new Error("Video couldn't be found");
         err.statusCode = 404;
         return next(err);
     }
     let {type} = req.body
    let like = await Like.findOne(
        {where:{
            [Op.and]:[
                {videoId:req.params.videoId},
                {likerId:req.user.id},
            ]}
        }
    )
    if(like){
        if (like.type === type) {
            like.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                likeId:like.id,
                statusCode: 200
            })
        } else {
            return res.status(404).json({
                message: "Like couldn't be deleted",
                statusCode: 404
            })
        }
    }
    return res.status(404).json({
        message: "Like couldn't be found",
        statusCode: 404
    })
})


// update like or dislike
router.put('/:videoId', requireAuth, async(req,res,next) => {
    let video = await Video.findByPk(req.params.videoId)
    if(!video){
        const err = new Error("Video couldn't be found");
         err.statusCode = 404;
         return next(err);
     }
     let like = await Like.findOne(
        {where:{
            [Op.and]:[
                {videoId:req.params.videoId},
                {likerId:req.user.id}
            ]}
        }
    )
    let {type} = req.body
    if (like) {
        const updateLike = await like.update({
            likerId:req.user.id,
            videoId:req.params.videoId,
            likableType:'video',
            type:type
        })
        return res.status(200).json(updateLike)
    }else{
        return res.status(404).json({
            message: "Like couldn't be found",
            statusCode: 404
        })
    }
})


module.exports = router;
