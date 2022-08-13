const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ua', 'ru'],

    },
    localePath: path.resolve('./public/locales'),
    defaultNS: 'app',
    serializeConfig: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development'
};
