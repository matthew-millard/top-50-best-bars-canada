const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const Image = require('../models/image');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create an instance of AWS S3
const s3 = new AWS.S3();

async function uploadImages() {
  const imageDir = './assets/images';
  const images = fs.readdirSync(imageDir);

  for (const image of images) {
    const imagePath = path.join(imageDir, image);
    const imageStream = fs.createReadStream(imagePath);
    const key = `images/${image}`;

    // Extract bar_id from image filename
    const barId = parseInt(image.split('_')[1]);

    // Upload image to S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: imageStream,
      ACL: 'public-read',
    };

    const s3UploadResponse = await s3.upload(params).promise();

    // Save the image URL to the database
    const imageUrl = s3UploadResponse.Location;
    await Image.create({ url: imageUrl, bar_id: barId });
  }
}

uploadImages().catch(console.error);
