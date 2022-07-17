const { generate } = require('./functions/generate-pdf/handler');

const body = {
  title: 'My Title',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit interdum urna et vulputate. Fusce placerat leo consequat sagittis ultrices. Duis ut ornare nibh, sed pretium purus. Pellentesque consequat consectetur elementum. In hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque luctus, tellus in pellentesque sagittis, libero magna finibus urna, non tincidunt massa tortor eu sapien.',
};
generate({ body: JSON.stringify(body) });
