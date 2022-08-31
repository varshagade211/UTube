const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Video,Comment,Subscribe,Like, User} = require('../../db/models');
const { check } = require('express-validator');
const {singlePublicFileUpload,singleMulterUpload , deleteSingleFile} = require('../../awsS3')
const { handleValidationErrors } = require('../../utils/validation');




const validateVideo = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Title is required.'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    // check('url')
    //   .isString()
    //   .withMessage('Url is required'),

    handleValidationErrors
];
// get all videos
router.get('/', async (req, res, next)=>{
    let videos = await Video.findAll({
        include:[{
            model: Like
        },
        {
          model:Comment
        },
        {
            model:User,
            include:[{
                model:User, as:'subscribee'
            }]
        }
      ],
    })
    res.json({videos:videos})
})

// get one video by id
router.get('/:id', async(req,res,next) => {
    let video = await Video.findByPk(req.params.id,
        {
            where,
            include:[{
                model: Like
            },
            {
              model:Comment
            },
            {
                model:User,
                include:[{
                    model:Subscribe
                }]
            }

        ]})

    if(!video){
       const err = new Error("Video couldn't be found");
        err.statusCode = 404;
        return next(err);
    }

    let viewIncrement = await Video.update({
        title:video.title,
        description:video.description,
        url:video.url,
        views:views++

    })

    return res.status(200).json(viewIncrement)
})

// create video
router.post('/',  singleMulterUpload("video"), requireAuth, validateVideo, async (req, res,next)=>{
    const {title,description} = req.body;

    if(!req.file){
        const err = Error('Validation error');
        err.errors = {url:"Video url cannot be empty"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);
    }
    if(req.file.size > 5242880){
        const err = Error('Validation error');
        err.errors = {url:"maximum allowed file size is 5MB"}
        err.status = 400;
        err.title = "Validation Errors"
        return next(err);
    }
    // const videoUrl = await singlePublicFileUpload(req.file);
    console.log(req.file.size)
    return

    if(!videoUrl){
        const err = Error('AWS error');
        err.errors = {url:"AWS video upload failed"}
        err.status = 400;
        err.title = "AWS Errors"
        return next(err);
    }

    const video = await Video.create({
        title,
        description,
        videoUrl,
        uploaderId:req.user.id
    })
    return res.status(200).json(video)

})

// edit video
router.put('/:id', requireAuth, validateVideo,async(req,res,next) => {

    let video = await Video.findByPk(req.params.id)
    if(!video){
        const err = new Error("Video couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    const {title, description} = req.body;

    if(video.uploaderId === req.user.id){
        let newVideo = await video.update({
           title,
           description
        })
        return res.status(200).json(newVideo)
    } else {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }

})

// delete video
router.delete('/:id', requireAuth , async(req,res,next) => {
    let video = await Video.findByPk(req.params.id)


    if(!video){
        const err = new Error("Video couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    if(video.uploaderId === req.user.id){
        try {
            // let fileName = video.url.split('/').pop()

            // const response = await deleteSingleFile(fileName);

            video.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
        } catch {
            const err = new Error("Failed to remove video");
            err.statusCode = 500;
            return next(err);
        }

    }else {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }



})


module.exports = router;
