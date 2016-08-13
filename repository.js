var fs = require('fs');
var path = require('path');

module.exports.getConnectors = function() {
  var fullPath = path.join(__dirname, 'data', 'connectors.json');
  try {
    var fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (err){
    return null;
  }
}

module.exports.saveConnectors = function(data) {
  fs.writeFileSync(path.join(__dirname, 'data', 'connectors.json'), JSON.stringify(data.json));

  var xml = data.xml;

  for (version in xml) {
    fs.writeFileSync(path.join(__dirname, 'data', `${version}.xml`), xml[version]);
  }
}
