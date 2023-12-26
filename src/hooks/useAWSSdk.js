import {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  S3Client,
} from '@aws-sdk/client-s3'

const useAWSSdk = () => {
  const twentyFiveMB = 25 * 1024 * 1024
  const createString = (size = twentyFiveMB) => {
    return 'x'.repeat(size)
  }

  const upload = async ({
    bucket: bucketName,
    key,
    file,
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
  }) => {
    const creds = {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    }

    const s3Client = new S3Client({ region, credentials: creds })
    const str = createString()
    const buffer = Buffer.from(str, 'utf8')
    let uploadId

    try {
      const multipartUpload = await s3Client.send(
        new CreateMultipartUploadCommand({
          Bucket: bucketName,
          Key: key,
          Body: file,
          region,
        })
      )

      uploadId = multipartUpload.UploadId

      const uploadPromises = []
      // Multipart uploads require a minimum size of 5 MB per part.
      const partSize = Math.ceil(buffer.length / 5)

      // Upload each part.
      for (let i = 0; i < 5; i++) {
        const start = i * partSize
        const end = start + partSize
        uploadPromises.push(
          s3Client
            .send(
              new UploadPartCommand({
                Bucket: bucketName,
                Key: key,
                UploadId: uploadId,
                Body: buffer.subarray(start, end),
                PartNumber: i + 1,
                region,
              })
            )
            .then((d) => {
              console.log('Part', i + 1, 'uploaded')
              return d
            })
        )
      }

      const uploadResults = await Promise.all(uploadPromises)

      return await s3Client.send(
        new CompleteMultipartUploadCommand({
          Bucket: bucketName,
          Key: key,
          UploadId: uploadId,
          region,
          MultipartUpload: {
            Parts: uploadResults.map(({ ETag }, i) => ({
              ETag,
              PartNumber: i + 1,
            })),
          },
        })
      )

      // Verify the output by downloading the file from the Amazon Simple Storage Service (Amazon S3) console.
      // Because the output is a 25 MB string, text editors might struggle to open the file.
    } catch (err) {
      console.error(err)

      if (uploadId) {
        const abortCommand = new AbortMultipartUploadCommand({
          Bucket: bucketName,
          Key: key,
          UploadId: uploadId,
          region,
        })

        await s3Client.send(abortCommand)
      }
    }
  }

  return { upload }
}

export default useAWSSdk
