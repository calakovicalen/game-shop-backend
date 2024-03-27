import { GetObjectCommand } from '@aws-sdk/client-s3';
import csvParser from 'csv-parser';

import { s3client } from '../../aws/s3Client.js';

export async function importFileParser(event) {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));

    for (const record of event.Records) {
      const bucket = record.s3.bucket.name;
      const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

      const params = { Bucket: bucket, Key: key };
      const s3Stream = await s3client.send(new GetObjectCommand(params)).Body;

      s3Stream
        .pipe(csvParser())
        .on('data', data => {
          console.log('Parsed record:', data);
        })
        .on('end', () => {
          console.log('CSV file parsing finished.');
        })
        .on('error', err => {
          console.error('Error parsing CSV:', err);
        });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'ImportFileParser executed successfully',
      }),
    };
  } catch (err) {
    console.error(err);
  }
}
