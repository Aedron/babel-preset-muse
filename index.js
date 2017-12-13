
module.exports = {
  plugins: [
      require("./plugins/if-directive"),
      require("./plugins/for-directive"),
      require("./plugins/two-way-binding"),
      require("./plugins/remove-empty-jsx"),

      require("babel-plugin-transform-object-rest-spread"),
      require("babel-plugin-transform-function-bind"),
      require("babel-plugin-transform-decorators-legacy").default,
      require("babel-plugin-transform-class-properties"),

      require("./plugins/transform-jsx")
  ]
};
