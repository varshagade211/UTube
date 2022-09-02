'use strict';
const {Video,Comment,User} = require('../models')

const commentsData = [
  {
    comment:'first comment',
    videoTitle:'first video',
    commenterEmail:'tom@user.io'
  },
  {
    comment:'second comment',
    videoTitle:'first video',
    commenterEmail:'tom@user.io'
  },
  {
    comment:'third comment',
    videoTitle:'second video',
    commenterEmail:'tom@user.io'
  },
  {
    comment:'fourth comment',
    videoTitle:'fourth video',
    commenterEmail:'tom@user.io'
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {


      for(let commentIndex = 0; commentIndex < commentsData.length; commentIndex++) {
        let commentData = commentsData[commentIndex]
        let userEmail = commentData.commenterEmail
        let videoTitle = commentData.videoTitle
        const commenter = await User.findOne({where:{email:userEmail}})
        const video = await Video.findOne({where:{title:videoTitle}})
        if (commenter) {
          const commenterId = commenter.id
          const videoId = video.id
          delete commentData.commenterEmail
          delete commentData.videoTitle
          await Comment.create({...commentData, commenterId,videoId})
        }
      }

  },

  async down (queryInterface, Sequelize) {
    for(let commentIndex = 0; commentIndex < commentsData.length; commentIndex++) {
      let commentData = commentsData[commentIndex]
      let userEmail = commentData.commenterEmail
      let videoTitle = commentData.videoTitle
      const commenter = await User.findOne({where:{email:userEmail}})
      const video = await Video.findOne({where:{title:videoTitle}})
      if (commenter) {
        const commenterId = commenter.id
        const videoId = video.id
        delete commentData.commenterEmail
        delete commentData.videoTitle
        await Comment.destroy({where : {...commentData,commenterId,videoId }})
      }
    }
  }
};
