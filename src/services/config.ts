const spacesUrl =
  'https://dp1ky5oyba.execute-api.eu-west-1.amazonaws.com/prod/';

export const config = {
  REGION: 'eu-west-1',
  USER_POOL_ID: 'eu-west-1_2WmDY7X2t',
  APP_CILENT_ID: '15qq8520m0b4npcgg0fa83441g',
  IDENTITY_POOL_ID: 'eu-west-1:5ad6cbec-7836-4623-955e-7f4052a37809',
  SPACES_PHOTOS_BUCKET: 'spaces-photos-029b26d9f2f1',
  AWS_ACCESS_KEY_ID: 'AKIA34LPPF66RAW7EJGN',
  AWS_SECRET_ACCESS_KEY: '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',
  api: {
    baseUrl: spacesUrl,
    spacesUrl: `${spacesUrl}spaces`,
  },
};
