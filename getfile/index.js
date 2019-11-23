// include file system library
const fs = require("fs");
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

const mimeType = {
    '.ico': 'image/x-icon', '.html': 'text/html', '.js': 'text/javascript',
    '.json': 'application/json', '.css': 'text/css', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject', '.ttf': 'aplication/font-sfnt'
};

// you can send full url here
function getExtension(filename) {
    return '.' + filename.split('.').pop();
}

module.exports = async function (context, req) {
    var file = "index.html"; //default file
    var modified = false;

    if (req.query.file) file = req.query.file;

    // if no file extension given, default to html (about ==> about.html)
    if (file.indexOf(".") == -1) {
        modified = true;
        file += ".html";
    }

    var ext = getExtension(file);
    var contentType = mimeType[ext] || 'text/plain';

    //file = file.replace(/\//g, "\\");

    try {
        context.log('GET ' + __dirname + "//content//" + file);
        const data = await readFileAsync(__dirname + "//..//content//" + file);

        context.res = {
            status: 200,
            body: data,
            isRaw: true,
            headers: {
                'Content-Type': contentType
            }
        };
    } catch (e) {
        if (e.code == "ENOENT") {
            try {   // try if its a folder request, default to index.html
                file = file.replace(".html", "/index.html");
                contentType = mimeType[ext] || 'text/plain';
                const data = await readFileAsync(__dirname + "//..//content//" + file);

                context.res = {
                    status: 200,
                    body: data,
                    isRaw: true,
                    headers: {
                        'Content-Type': contentType
                    }
                }
            } catch (e) {
                context.log("Error: " + e);

                context.res = {
                    status: 404,
                    body: "Not Found.",
                    headers: {
                    }
                };
            }
        } else {
            context.log("Error: " + e);

            context.res = {
                status: 404,
                body: "Not Found.",
                headers: {
                }
            };
        }
    }
};