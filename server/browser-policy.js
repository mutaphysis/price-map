/* globals BrowserPolicy */
BrowserPolicy.content.allowOriginForAll('api.mapbox.com');
BrowserPolicy.content.allowOriginForAll('npmcdn.com');
BrowserPolicy.content.allowOriginForAll('secure.gravatar.com');
BrowserPolicy.content.allowOriginForAll('blob:');
BrowserPolicy.content.allowImageOrigin('blob:');
var constructedCsp = BrowserPolicy.content._constructCsp();
BrowserPolicy.content.setPolicy(constructedCsp + ' media-src blob:;');
