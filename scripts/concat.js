'use strict';

(function (window, document, Core) {

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

                client.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        resolve(this.response);
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                client.onerror = function () {
                    reject(this.statusText);
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
                'delete': function _delete(args) {
                    return ajax('DELETE', url, args);
                }
            };
        };
        return model;
    };
})(window, document, window.Core = window.Core || {});
//# sourceMappingURL=core.js.map
'use strict';

(function (window, document) {
    var init = function init() {
        //alert('doc test ready');
        // http://keithratner.com/wp-json/posts
        // http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063
        var api = {
            dataType: 'jsonp',
            uri: 'http://www.keithratner.com/?wpapi=get_posts&dev=1&id=2063',
            root: 'http://www.keithratner.com',
            postid: '2063'
        },
            model = window.Core.Model(),
            renderPost = function renderPost(post) {
            console.log(post);
        },
            getPostId = function getPostId(id) {
            $.ajax({
                crossDomain: true,
                type: 'GET',
                //headers: {'Access-Control-Allow-Origin': '*'},
                //jsonpCallback: 'jsonhandler',
                //contentType: 'application/json; charset=utf-8',
                async: false,
                //jsonp: 'callback',
                url: api.root + '?wpapi=get_posts&dev=1&id=' + id,
                dataType: 'json'
                // jsonp: 'jsonp'
                // success: function(data) {
                //     console.log(data);
                // }
            }).then(function (post, textStatus, jqXHR) {
                console.log(post);
            });
        },
            onload = function onload(data) {
            console.log('data loaded');
        },
            createCORSRequest = function createCORSRequest(method, url, onload) {
            var xhr = new XMLHttpRequest();
            if ('withCredentials' in xhr) {
                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest !== 'undefined') {
                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // Otherwise, CORS is not supported by the browser.
                xhr = null;
            }
            xhr.onload = function () {
                var responseText = xhr.responseText;
                console.log(responseText);
            };
            xhr.onerror = function () {
                console.log('There was an error!');
            };
            return xhr;
        },
            xhr = createCORSRequest('GET', api.root + '?wpapi=get_posts&dev=1&id=' + api.postid, onload);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        // getPostId = id => model.httpRequest(api.root + '?wpapi=get_posts&dev=1&id=' + id)
        //     .get()
        //     .then((data) => {
        //         let post = JSON.parse(data);
        //         renderPost(post);
        //     })
        //     .catch((data) => {
        //         console.log(data);
        //     });
        getPostId(2063);
        // $.ajax({
        //     type: 'GET',
        //     url: 'https://graph.facebook.com/10150232496792613',
        //     dataType: 'jsonp',
        //     success: function(data) {
        //         console.log(data);
        //     }
        // });

        // $.ajax({
        //     url: api.uri
        // });
    };
    $(document).ready(init);
})(window, document);
//# sourceMappingURL=main.js.map
