module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'Change Secret Here',
  TOKEN_AGE_MILLIS: (24 * 60 * 60 * 1000), //a day
  STATIC_CACHE_EXPIRE: '1d',
  LOG_DIR: './logs',
  LOGGLY_TOKEN: process.env.LOGGLY_TOKEN,
  LOGGLY_SUBDOMAIN: process.env.LOGGLY_SUBDOMAIN
};
