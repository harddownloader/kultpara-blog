const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ua', 'ru'],
    },
    localePath: path.resolve('./public/static/locales'),
    // serializeConfig: false,
    // defaultNS: 'app',
    reloadOnPrerender: process.env.NODE_ENV === 'development'
};
