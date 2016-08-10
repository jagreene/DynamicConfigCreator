var fs = require('fs');
var path = require('path');

module.exports.getConnectors = function() {
  var fullPath = path.join(__dirname, 'data', 'connectors.json');
  var fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

module.exports.saveConnectors = function(data) {
  fs.writeFileSync(path.join(__dirname, 'data', 'connectors.json'), JSON.stringify(data.json));

  let xml = data.xml;

  for (version in xml) {
    fs.writeFileSync(path.join(__dirname, 'data', `${version}.xml`), xml[version]);
  }
}
