module.exports = {
  devServer: {
    proxy: {
      '/melon-api': {
        target: 'https://melon.danielko.me/',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: (path) => path.replace('melon-api/', 'api/v1/chart/'),
      },
      '/spotify-auth': {
        target: 'https://accounts.spotify.com/',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: (path) => path.replace('spotify-auth/', 'api/'),
      },
      '/spotify-api': {
        target: 'https://api.spotify.com/',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: (path) => path.replace('spotify-api/', 'v1/'),
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  pwa: {
    name: 'Kavie App',
    themeColor: '#34d399',
    manifestOptions: {
      short_name: 'Kavie',
      background_color: '#4b5563',
    },
  },
};
