var fs = require('fs');
var path = require('path');

module.exports.getConnectors = function() {
  var files = fs.readdirSync(path.join(__dirname, 'data'));
  files = files.filter(file => file.includes('.json'));
  return state = files.reduce((state, file) => {
    var fullPath = path.join(__dirname, 'data', file);
    try {
      var fileContents = fs.readFileSync(fullPath, 'utf8');
      let data = JSON.parse(fileContents);
      state[data.id] = data;
      return state
    } catch (err){
      return state;
    }
  }, {})
}

module.exports.saveConnectors = function(data) {
  try {
    // write out json files
    let json = data.json;
    let connectorIds = Object.keys(json);
    connectorIds.forEach(connectorId => {
      let connector = json[connectorId];
      fs.writeFileSync(path.join(__dirname, 'data', `${connector.name}.json`), JSON.stringify(connector));
    })

    // write out xml files
    let xml = data.xml;
    for (version in xml) {
      fs.writeFileSync(path.join(__dirname, 'data', `${version}.xml`), xml[version]);
    }
    return true;
  } catch (err) {
    return false;
  }
}
