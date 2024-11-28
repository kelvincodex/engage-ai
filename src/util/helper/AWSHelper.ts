import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from 'uuid';

export class AWSHelper {
    static async uploadToS3Bucket(file: File){
        const client = new S3Client({
            credentials:{
                accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
                secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
            },
            region: import.meta.env.VITE_AWS_REGION
        });
        const uniqueFileName = AWSHelper.generateUniqueFileName(file.name)

        try {
            const command = new PutObjectCommand({
                Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
                Key: uniqueFileName,
                Body: file,
                ContentType: file.type,
            });

            await client.send(command);
            console.log('File uploaded successfully');
            return `https://${import.meta.env.VITE_APP_S3_BUCKET}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${uniqueFileName}`;
            // return `https://${import.meta.env.VITE_APP_S3_BUCKET}.s3.${import.meta.env.VITE_APP_AWS_REGION}.amazonaws.com/${command.Key}`
        } catch (error) {
            console.error('Error uploading file: ', error);
            console.log('Error uploading file');
            return null
        }
    }

   private static generateUniqueFileName = (originalName: string) => {
        const uuid = uuidv4();
        const fileExtension = originalName.split('.').pop();
        return `${uuid}.${fileExtension}`;
    };

    private static generateUniqueFileNameWithTimestamp = (originalName: string) => {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = originalName.split('.').pop();
        return `${timestamp}-${randomString}.${fileExtension}`;
    };
}