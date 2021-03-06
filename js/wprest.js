(function (window, document, Core) {
    'use strict';
    Core.Model = function () {
        var model = {},
            ajax = function ajax(method, url, args) {
            // private function for ajax call

            // Creating a promise
            var promise = new Promise(function (resolve, reject) {
                // Instantiates the XMLHttpRequest
                var client = new XMLHttpRequest(),
                    uri = url,
                    argcount = 0,
                    key = void 0;
                //key = undefined;

                if (args && (method === 'POST' || method === 'PUT')) {
                    uri += '?';
                    for (key in args) {
                        if (args.hasOwnProperty(key)) {
                            if (argcount++) {
                                uri += '&';
                            }
                            uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                        }
                    }
                }

                client.open(method, uri);
                client.send();

                client.onload = function () {
                    if (client.status >= 200 && client.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(client.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(client.statusText);
                    }
                };
                client.onerror = function () {
                    reject(client.statusText);
                };
            });

            // Return the promise
            return promise;
        };
        model.httpRequest = function (url) {
            return {
                'get': function get(args) {
                    return ajax('GET', url, args);
                },
                'post': function post(args) {
                    return ajax('POST', url, args);
                },
                'put': function put(args) {
                    return ajax('PUT', url, args);
                },
                // 'delete': function _delete(args) {
                'delete': function _delete(args) {
                    return ajax('DELETE', url, args);
                }
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
/*global $*/
'use strict';
(function (window, document) {
    var init = function init() {
        // stored elements
        var $el = {
            footer: {
                copyright: $('.copyright')
            }
        };

        $el.footer.copyright.html('&copy;' + function () {
            return new Date();
        }().getFullYear());
    };
    $(document).ready(init);
})(window, document);
