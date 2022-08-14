const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ua', 'ru'],
    },
    localePath: path.resolve('./public/static/locales'),
    // react: { useSuspense: false }, //this line
    // serializeConfig: false,
    // defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',
    reloadOnPrerender: process.env.NODE_ENV === 'development'
};
