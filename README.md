# lambda-pdfkit

s3 bucket created
aws creds set

npm i

npx serverless deploy

```bash
➜  lambda-pdfkit git:(main) ✗ npx serverless deploy

Deploying pdf-generator to stage dev (eu-west-1)

✔ Service deployed to stack pdf-generator-dev (39s)

endpoint: POST - https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/generatePDF
functions:
  generatePDF: pdf-generator-dev-generatePDF (985 B)
layers:
  Pdfkit: arn:aws:lambda:eu-west-1:xxxxxxxxxxxx:layer:Pdfkit:1

Monitor all your API routes with Serverless Console: run "serverless --console"
```

```bash
curl -X POST 'https://xxxxxxxxxx.execute-api.eu-west-1.amazonaws.com/generatePDF' -H 'Content-Type: application/json' -d '{"title":"Lorem Ipsum","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit interdum urna et vulputate. Fusce placerat leo consequat sagittis ultrices. Duis ut ornare nibh, sed pretium purus. Pellentesque consequat consectetur elementum. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque luctus, tellus in pellentesque sagittis, libero magna finibus urna, non tincidunt massa tortor eu sapien."}'
```
