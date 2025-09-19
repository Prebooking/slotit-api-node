import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { ResponseService } from 'src/common/services/response.service';
import { v4 as uuid } from 'uuid';
import { DeleteFileDto } from './dto/delete-file.dto';

@Injectable()
export class FileUploadsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly response: ResponseService,
  ) {}
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME || 'slotit',
        Body: dataBuffer,
        Key: `${uuid()}-filename-${filename}`,
        // ContentType: 'image/jpeg',
      })
      .promise();

    const result = {
      key: uploadResult.Key,
      url: uploadResult.Location,
      filename: filename,
    };
    return this.response.successResponse('file upload completed', result);
  }

  async deletePublicFile(deleteFileDto: DeleteFileDto) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME || 'slotit',
        Key: deleteFileDto.fileId,
      })
      .promise();
    return this.response.successResponse('file deleted successfully');
  }
}
