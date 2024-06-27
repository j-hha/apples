function insertIntoTarget(element, options) {
  var parent = options.target || document.head;
    parent.appendChild(element);
}

module.exports = insertIntoTarget;

//source: https://webpack.js.org/loaders/style-loader/#insert

