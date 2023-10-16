// export function webpack(config) {
//   config.resolve.alias["pages"] = path.join(__dirname, "frontend", "pages");
//   return config;
// }

module.exports = {
  webpack: function (config) {
    config.resolve.alias["pages"] = path.join(__dirname, "frontend", "pages");
    return config;
  },
};

// これによりアプリケーションが /frontend パスで提供されるため、URLに /frontend を含むことに注意してください。
// module.exports = {
//   basePath: "/frontend",
// };
