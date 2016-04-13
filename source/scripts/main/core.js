'use strict';

((window, document, Core) => {
    Core.Model = () => {
        let model = {},
            ajax = (method, url, args) => {
            // private function for ajax call

            // Creating a promise
                let promise = new Promise((resolve, reject) => {
                // Instantiates the XMLHttpRequest
                    let client = new XMLHttpRequest(),
                        uri = url,
                        argcount = 0,
                        key;
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

                    client.onload = evt => {
                        let _this = evt.target;
                        if (_this.status >= 200 && _this.status < 300) {
                            // Performs the function "resolve" when this.status is equal to 2xx
                            resolve(_this.response);
                        } else {
                            // Performs the function "reject" when this.status is different than 2xx
                            reject(_this.statusText);
                        }
                    };
                    client.onerror = evt => {
                        let _this = evt.target;
                        reject(_this.statusText);
                    };
                });

                // Return the promise
                return promise;
            };
        model.httpRequest = url => {
            return {
                'get': args => ajax('GET', url, args),
                'post': args => ajax('POST', url, args),
                'put': args => ajax('PUT', url, args),
                // 'delete': function _delete(args) {
                'delete': args=> ajax('DELETE', url, args)
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
