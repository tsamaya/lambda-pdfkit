/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const PDFKit = require('pdfkit');

const s3 = new AWS.S3();

const BUCKET = process.env.BUCKET || 'test-files-678kph';
const REGION = process.env.REGION || 'eu-west-1';

const generatePDF = async ({ title, text }) =>
  new Promise((resolve) => {
    const doc = new PDFKit();
    const buffers = [];
    doc.font('Helvetica-Bold').text(title);
    doc.font('Helvetica');
    doc.text(text);
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdf = Buffer.concat(buffers);
      resolve(pdf);
    });
    doc.end();
  });

const savePDF = async (key, pdf) =>
  new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: BUCKET,
        Key: key,
        Body: pdf,
        ContentType: 'application/pdf',
        ACL: 'private',
      },
      (err, result) => {
        if (err) {
          console.error('ERROR!', err);
          reject(err);
        }
        if (result) {
          console.log('RESULT!', result);
          resolve(result);
        }
      }
    );
  });

const generateURI = (keyValue) =>
  `https://${BUCKET}.s3.${REGION}.amazonaws.com/${keyValue}`;

module.exports.generate = async ({ body }) => {
  const key = `file-${Date.now()}.pdf`;
  let data;
  try {
    data = JSON.parse(body);
  } catch (error) {
    data = { title: 'Pending...', text: 'n.a.' };
  }
  try {
    console.log('Generating document');
    const pdf = await generatePDF(data);
    console.log('Save to S3');
    await savePDF(key, pdf);
    return {
      statusCode: 200,
      body: generateURI(key),
    };
  } catch (error) {
    console.log('Glitch in the Matrix', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
