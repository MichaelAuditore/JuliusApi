const AWS = require('aws-sdk/dist/aws-sdk-react-native')

export const closeSession = () => {
  sessionStorage.clear()
}

export const checkSession = () => {
  const token = sessionStorage.getItem('tokenId')

  if (token) {
    return true
  }
  return false
}

export const saveImage = async (file) => {
  const albumBucketName = 'miguelpbucket'
  const albumName = 'images'
  const bucketRegion = 'us-east-2'
  const IdentityPoolId = 'us-east-2:2899cfea-9715-474b-9100-b4002df1d0b6'

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  })

  const fileName = file.name
  const albumPhotosKey = encodeURIComponent(albumName) + '/'

  const photoKey = albumPhotosKey + fileName

  // Use S3 ManagedUpload class as it supports multipart uploads
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ACL: 'public-read',
    },
  })

  var promise = upload.promise()
  return await promise.then(
    function (data) {
      alert('Successfully uploaded photo.')
      return data
    },
    function (err) {
      return alert('There was an error uploading your photo: ', err.message)
    }
  )
}
