module.exports = {
    proxy: "http://localhost:3000",
    files: ["public/*.css", "views/**/*.ejs", "public/*.js"],
    port: 3001,
    open: true,
    reloadDelay: 500
  };
  