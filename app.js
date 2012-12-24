//var sys = require("sys");
var fs = require('fs');
var http = require('http');
var database = require('./db.js');
var db = database.db;

var dir = '../arcane/www11.arcaneempires.com/ajax/';
var file = '../arcane/www11.arcaneempires.com/ajax/fetchMapTiles.php';
var save = 'tiles.json';
var ver = '10.1.0';


//var Requests = mongoose.model('Requests', requestSchema);

var requests = [
    'YmxvY2tzPWJsXzBfYnRfNSUyY2JsXzBfYnRfMCZjaGFuZ2VkPSZtb2JpbGVpZD1lNjYwODgxNWRlNGIzZDM0ZmQxZmRkYjFlODk5OThmYSZwbGF0Zm9ybWlkPTIwMSZiZWNvbWVfdXNlcl9pZD0mYmVjb21lX3Bhc3N3b3JkPSZkZWJ1Zz0wJmd2ZXI9MTAuMS4wJmdhbWVTbG90PTkzJmdhbWVOdW1iZXI9MTM1NTkzNDI4OCZnYW1lS2V5PWFkYWVkZDEyMGE5OWI1NjNhZmQ0ZTgxOGRiMjVlYjc1',
    'YmxvY2tzPWJsXzVfYnRfNSUyY2JsXzVfYnRfMCZjaGFuZ2VkPSZtb2JpbGVpZD1lNjYwODgxNWRlNGIzZDM0ZmQxZmRkYjFlODk5OThmYSZwbGF0Zm9ybWlkPTIwMSZiZWNvbWVfdXNlcl9pZD0mYmVjb21lX3Bhc3N3b3JkPSZkZWJ1Zz0wJmd2ZXI9MTAuMS4wJmdhbWVTbG90PTk4JmdhbWVOdW1iZXI9MTM1NTkzNDI5MyZnYW1lS2V5PTVlZmJmMDBhNzI4ZDA5YjY2NDc1ODQzYzNlOTcxYjk1'
];

/*
var r = new Requests({ data: 'YmxvY2tzPWJsXzBfYnRfNSUyY2JsXzBfYnRfMCZjaGFuZ2VkPSZtb2JpbGVpZD1lNjYwODgxNWRlNGIzZDM0ZmQxZmRkYjFlODk5OThmYSZwbGF0Zm9ybWlkPTIwMSZiZWNvbWVfdXNlcl9pZD0mYmVjb21lX3Bhc3N3b3JkPSZkZWJ1Zz0wJmd2ZXI9MTAuMS4wJmdhbWVTbG90PTkzJmdhbWVOdW1iZXI9MTM1NTkzNDI4OCZnYW1lS2V5PWFkYWVkZDEyMGE5OWI1NjNhZmQ0ZTgxOGRiMjVlYjc1' });
r.save(function(err, r) {
    if (err) {

    }

    console.log(r);
});
*/

function extend() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,
        class2type = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Object]": "object"
        },
        jQuery = {
            isFunction: function (obj) {
                return jQuery.type(obj) === "function"
            },
            isArray: Array.isArray ||
                function (obj) {
                    return jQuery.type(obj) === "array"
                },
            isWindow: function (obj) {
                return obj != null && obj == obj.window
            },
            isNumeric: function (obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj)
            },
            type: function (obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
            },
            isPlainObject: function (obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                    return false
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                } catch (e) {
                    return false
                }
                var key;
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key)
            }
        };
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        // WARNING: RECURSION
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
}

function saveFile(obj) {
    fs.writeFileSync(save, 'makeTiles(' + JSON.stringify(obj) + ')', 'utf8');
}

/*
var tileContents = fs.readFileSync(save, 'utf8');
var tiles = JSON.parse(tileContents);

fs.watchFile(dir, function(event, filename) {
    console.log(this, arguments);
    try {
        var fileContents = fs.readFileSync(file, 'utf8');
        var schema = JSON.parse(fileContents);

        tiles = extend(true, tiles, schema);
        console.log(schema);
        saveFile(tiles);
    } catch(e) {
        console.log(e);
    }
});
*/

/*
fs.watch("../arcane/www11.arcaneempires.com/ajax/fetchMapTiles.php", { persistent: true }, function(event, filename) {
    sys.puts("\n" + event);
    sys.puts("\n" + filename);

});
*/
var makeRequest = function() {
    var options = {
        hostname: 'www11.arcaneempires.com',
        port: 80,
        path: '/ajax/fetchMapTiles.php',
        method: 'POST',
        headers: {
            'User-Agent': 'arcaneempires/10.1.0 CFNetwork/548.1.4 Darwin/11.0.0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var req = http.request(options, function(res) {
        var buf = '';

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            buf += chunk;
        });

        res.on('end', function() {
            try {
                buf = JSON.parse(buf || '');
                if (buf && buf.ok === true) {
                    database.updateAlliances(buf.allianceNames, buf.allianceMights);

                    database.updateEmitter.on('updatedAlliances', function(message) {
                        database.updatePlayers(buf.userInfo);
                    });

                    database.updateEmitter.on('updatedPlayers', function(message) {
                        database.updateTiles(buf);
                        console.log('Updated Tiles!');
                    });
                }
            } catch(e) {
                console.log('Something went wrong: ' + e);
            }
        })
    });

    req.on('error', function(e) {
       console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write('data=' + requests[1] + '&vcs=' + ver);
    req.end();
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    makeRequest();
});
