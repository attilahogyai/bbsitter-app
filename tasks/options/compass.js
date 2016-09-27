module.exports = {
  options: {
    sassDir: "app/styles",
    specify: "app/styles/app.scss",
    cssDir: "tmp/result/assets",
    generatedImagesDir: "tmp/result/assets/images/generated",
    imagesDir: "public/assets/images",
    javascriptsDir: "app",
    fontsDir: "public/assets/fonts",
    importPath: ["vendor/foundation/scss/"],
    httpImagesPath: "/assets/images",
    httpGeneratedImagesPath: "/assets/images/generated",
    httpFontsPath: "/assets/fonts",
    relativeAssets: false,
    debugInfo: true
  },
  compile: {}
};
