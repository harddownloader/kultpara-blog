const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ua', 'ru'],
    },
    localePath: path.resolve('./public/static/locales'),
    // serializeConfig: false,
    // defaultNS: 'common',
    debug: true, // process.env.NODE_ENV === 'development',
    reloadOnPrerender: process.env.NODE_ENV === 'development'
};
