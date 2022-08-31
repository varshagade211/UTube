'use strict';

const {Video,User} = require('../models')
const videosData = [
  {
    title:'first video',
    description:'testing my first video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'second video',
    description:'testing my second video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'third video',
    description:'testing my third video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'fourth video',
    description:'testing my fourth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },{
    title:'first video',
    description:'testing my fourth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'fifth video',
    description:'testing my fifth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'sixth video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'seven video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'eight video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'nine video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'ten video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'eleven video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
  {
    title:'twelve video',
    description:'testing my sixth video',
    url:"https://amazon-clone-bucket.s3.amazonaws.com/1661736462666.mp4",
    uploaderEmail:'tom@user.io'
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let videoIndex = 0; videoIndex < videosData.length; videoIndex++) {
      let videoData = videosData[videoIndex]
      let userEmail = videoData.uploaderEmail
      const uploader = await User.findOne({where:{email:userEmail}})

      if (uploader) {
        const uploaderId = uploader.id
        delete videoData.uploaderEmail
        await Video.create({...videoData, uploaderId})
      }
    }
  },

  async down (queryInterface, Sequelize) {
    for(let videoIndex = 0; videoIndex < videosData.length; videoIndex++) {
      let videoData = videosData[videoIndex]
      let userEmail = videoData.uploaderEmail
      const uploader = await User.findOne({where:{email:userEmail}})

      if (uploader) {
        const uploaderId = uploader.id
        delete videoData.uploaderEmail
        await Video.destroy({where : {...videoData,uploaderId }})
      }
    }
  }
};
