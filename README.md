<p align="center">
  <a href="https://kavie.vercel.app/">
    <img height="300px" src="https://raw.githubusercontent.com/Hephaest/kavie/main/public/img/icons/android-chrome-512x512.png">
  </a>
</p>

<h1 align="center">Kavie</h1>

<div align="center">

Kavie, a place only for k-pop, love and fun.

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url]
  
[david-image]: https://img.shields.io/david/Hephaest/kavie?style=flat-square
[david-dev-url]: https://david-dm.org/Hephaest/kavie?type=dev
[david-dev-image]: https://img.shields.io/david/dev/ant-design/ant-design?style=flat-square
[david-url]: https://david-dm.org/Hephaest/kavie

</div>

## ⚙️ Backgrounds

- Authentication and authorization by Firebase.
- Responsive design under Tailwind framework.
- Backend supports mainly from Firebase.
- Deployment under Vercel platform.

## 🌈 Features

- Login and register supports.
- User profile management supports.
- K-pop and fandom data retrieval supports.
- Audio upload and management supports.
- Comment and reaction supports.

## ✨ What's New

- We've provided a more stable network connection and made features load faster.

## 📦 Development

Clone locally:
```
git@github.com:Hephaest/kavie.git
cd kavie
npm install
```
Create a `.env` file and fill out the following parameters:
```
VUE_APP_I18N_LOCALE=en
VUE_APP_I18N_FALLBACK_LOCALE=en
VUE_APP_SPOTIFY_CLIENT_ID=
VUE_APP_SPOTIFY_CLIENT_SECRET=
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_PRJ_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_APP_ID=
VUE_APP_CORS_PROXY_URL=
```
After that, run the following command:
```
npm run serve
```
## 🔗 Links

- [Tailwind](https://tailwindcss.com/)
- [Firebase SDK](https://firebase.google.com/docs/auth)
- [Spotify API](https://developer.spotify.com/discover/)
- [Melon API (unofficial)](https://github.com/ko28/melon-api)
- [Complete Vue Mastery 2021](https://www.udemy.com/course/complete-vue-js-developer-zero-to-mastery-vuex/)
