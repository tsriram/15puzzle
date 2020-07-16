export default {
  globDirectory: "./public/",
  globPatterns: ["**/*.{html,js,css,woff2}"],
  swDest: "./build/sw.js",
  clientsClaim: true,
  skipWaiting: false
};
