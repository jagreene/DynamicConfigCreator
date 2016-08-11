export function getDefaultEmptyConnector() {
  return {
    id: guid(),
    name: "New Connector",
    className: "",
    url: "",
    width: 601,
    height: 400,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    versionSupport: {
      "10.0" : false,
      "10.1" : true,
      "vNext" : true
    },
    localizedNames: {
      "zh_CN" : "",
      "de_DE" : "",
      "en_US" : "",
      "es_ES" : "",
      "fr_FR" : "",
      "ja_JP" : "",
      "ko_KR" : "",
      "pt_BR" : ""
    },
    supportedSKUs : {
      "public" : true,
      "standard" : true,
      "pro" : true
    },
    releaseStatus: "unreleased"
  };
}

export const releaseStatuses = ["unreleased", "alpha", "beta", "prod"];
export const skus = ["public", "standard", "pro"];
export const locales = ["zh_CN", "de_DE", "en_US", "es_ES", "fr_FR", "ja_JP", "ko_KR", "pt_BR"];
export const versions = ["10.0", "10.1", "vNext"];

export function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
