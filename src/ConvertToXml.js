import XmlBuilder from 'xmlbuilder';
import * as consts from './constants.js';

export function outputConnector(json, builderIn) {
  var builder = builderIn || XmlBuilder.create('connector');
  builder.ele('name', json.name);
  builder.ele('class-name', json.className);
  builder.ele('status', json.releaseStatus);
  builder.ele('skus', json.supportedSKUs);
  builder.ele('type', 'wdc');

  var nameElement = builder.ele('localized-strings')
    .ele('string', {'id':'name', 'default':json.name});
  Object.keys(json.localizedNames).forEach(locale => {
    nameElement.ele('localized-string', {'locale':locale}, json.localizedNames[locale]);
  })

  // TODO - created/modified
  builder.ele('created-date', json.createdDate);
  builder.ele('modified-date', json.modifiedDate);

  var wdcElement = builder.ele('wdc-info');
  wdcElement.ele('url', json.url);
  wdcElement.ele('width', json.width);
  wdcElement.ele('height', json.height);


  if (!builderIn) {
    var xml = builder.end({pretty:true, allowEmpty:true});
    return xml;
  } else {
    return builder;
  }
}

export function outputConfigs(connectors) {
  return consts.versions.reduce((xml, version) => {
    let builder = XmlBuilder.create('dynamic-config');
    builder.ele('target-version', version);
    builder.ele('modifiedDate', new Date().toISOString());
    builder.ele('etag', consts.guid());
    let connectorsEle = builder.ele("connectors");
    connectors.forEach( connector => {
      if (connector.versionSupport[version]) {
        let connectorEle = connectorsEle.ele("connector");
        outputConnector(connector, connectorEle);
      }
    });

    xml[version] = builder.end({pretty:true, allowEmpty:true});
    return xml;
  }, {});
}
