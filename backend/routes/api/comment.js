const express = require('express')
const router= express.Router()
const {requireAuth} = require('../../utils/auth')
const {Comment , Video, User} = require('../../db/models')
const {check} = require('express-validator')
const {handleValidationErrors}= require('../../utils/validation')


const validateComments = [
    check('comment')
      .exists({checkFalsy:true})
      .withMessage('Comment is required'),

    handleValidationErrors
]


// get all vidio's comments
router.get('/:videoId' , async(req,res,next) => {

    // let video = await Video.findByPk(req.params.videoId)
    // if(!video) {
    //     const err = new Error("Video couldn't be found");
    //     err.statusCode = 404;
    //     return next(err);
    // }
    let comments = await Comment.findAll({
        where:{videoId:req.params.videoId},
        order: [
            ["createdAt", "DESC"]
          ],
        include:[{
            model:User
        }]
    })
    if(!comments) {
        const err = new Error("comments couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    return res.status(200).json(comments)

})

// create comment on video
router.post('/:videoId', requireAuth, validateComments, async(req,res,next) => {
    const {comment} =req.body
    if(!comment){
        const err = Error('Validation error');
        err.errors = {comment:"Comment cannot be empty"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);
    }
    if(comment.length > 1000){
        const err = Error('Validation error');
        err.errors = {comment:"Comment greater than 1000 characters not allowed"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);
    }
    const newComment = await Comment.create({
        comment,
        videoId:req.params.videoId,
        commenterId:req.user.id
    })
    let user = await User.findByPk(req.user.id )
    newComment.dataValues.User = user

    return res.status(200).json(newComment)

})

// edit comment
router.put('/:id', requireAuth, validateComments, async(req,res,next) => {
    let foundComment = await Comment.findByPk(req.params.id)

    if(!foundComment) {
        const err = new Error("Comment couldn't be found")
        err.statusCode=404
        return next(err)
    }

    const {comment} =req.body

    if(req.user.id === foundComment.commenterId){
        if(comment.length > 1000){
            const err = Error('Validation error');
            err.errors = {comment:"Comment greater than 1000 characters not allowed"}
            err.status = 400;
            err.title = "Validation Errors"
            return next(err);
        }
        let user = await User.findByPk(req.user.id )
        const newComment = await foundComment.update({
            comment,
            videoId:foundComment.videoId,
            commenterId:req.user.id
        })

        newComment.dataValues.User = user
        return res.status(200).json(newComment)
    }else{
        const err = new Error('Forbidden')
        err.statusCode = 403
        return next(err)
    }


})



//delet comment
router.delete('/:commentId', requireAuth, async(req,res,next) => {
    let foundComment = await Comment.findByPk(req.params.commentId)

    if(!foundComment) {
        const err = new Error("Comment couldn't be found")
        err.statusCode=404
        return next(err)
    }
    if(req.user.id === foundComment.commenterId){
        try{
            foundComment.destroy()
            return res.status(200).json({
                message:"Successfully deleted",
                statusCode:200
            })

        }catch{
            const err = new Error("Faild to delete comment")
            err.statusCode= 500
            return next(err)
        }

    }else{
        const err = new Error('Forbidden')
        err.errors = {comment:"Unauthorised"}
        err.statusCode = 403
        return next(err)
    }


})

module.exports = router;
