const domainAuthorizationHandler = async (ctx, next) => {
  ctx.body = {
    authorization: true,
  };

  next();
};

module.exports = domainAuthorizationHandler;
