import { ICreateSpaceState } from '../components/spaces/CreateSpaces';
import { Space } from '../model/Model';
import { S3 } from 'aws-sdk';
import { config as appConfig } from './config';
import { generateRandomId2 } from '../utils/Utils';

// declare var process: {
//   env: {
//     AWS_ACCESS_KEY_ID: string;
//     AWS_SECRET_ACCESS_KEY: string;
//   };
// };

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    if (iCreateSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateSpace.photo,
        appConfig.SPACES_PHOTOS_BUCKET
      );
      iCreateSpace.photoURL = photoUrl;
      iCreateSpace.photo = undefined;
    }
    const requestUrl = appConfig.api.spacesUrl;
    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(iCreateSpace),
    };
    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();

    return JSON.stringify(resultJSON.id);
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = generateRandomId2() + file.name;
    const uploadResult = await new S3({
      apiVersion: 'latest',
      region: appConfig.REGION,
      credentials: {
        accessKeyId: appConfig.AWS_ACCESS_KEY_ID,
        secretAccessKey: appConfig.AWS_SECRET_ACCESS_KEY,
      },
    })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      })
      .promise();
    return uploadResult.Location;
  }

  public async getSpaces(): Promise<Space[]> {
    const requestUrl = appConfig.api.spacesUrl;
    const requestResult = await fetch(requestUrl, {
      method: 'GET',
    });
    const responseJSON = await requestResult.json();
    return responseJSON;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === '123') {
      return '5555';
    } else {
      return undefined;
    }
  }
}
