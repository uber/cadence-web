const losslessJSON = require('lossless-json');

const workflowExportHandler = async (ctx) => {
  let nextPageToken;

  do {
    const page = await ctx.cadence.exportHistory({ nextPageToken });

    if (!nextPageToken) {
      ctx.status = 200;
    }

    ctx.res.write(
      (nextPageToken ? ',' : '[') +
      page.history.events.map(losslessJSON.stringify).join(',')
    );
    nextPageToken =
      page.nextPageToken && Buffer.from(page.nextPageToken, 'base64');
  } while (nextPageToken);

  ctx.res.write(']');
  ctx.body = '';
};

module.exports = workflowExportHandler;
