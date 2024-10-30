const http = require("https");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

class SiteController {
    userAuth(req, res) {
        const {Server} = req.body
        console.log(Server)
        const user = 'root'
        const pass = 'h8OBKYm49xky7lKW85'
        const options = new URL(`https://${Server}:1500/ispmgr?out=json&func=auth&username=${user}&password=${pass}`);

        const newReq = http.request(options, function (newRes) {
            console.log('Отправляем запрос на сервер ' + Server)
            const chunks = [];

            newRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            newRes.on("end", function () {
                const body = Buffer.concat(chunks);
                const result = JSON.parse(body.toString())
                console.log(result)
                res.json(result)
            });
            newRes.on('error', (err) => {
                console.log('Попали в ошибку')
                console.log(err)
            })
        });

        newReq.end();
    }

    deleteSite(req, res) {
        const {Server, site, authId} = req.body
        const options = new URL(`https://${Server}:1500/ispmgr?out=json&auth=${authId}&elid=${site}&elname=${site}&func=webdomain.delete.confirm&remove_directory=on&sok=ok`);

        const newReq = http.request(options, function (newRes) {
            console.log('Отправляем запрос на сервер ' + Server)
            const chunks = [];

            newRes.on("data", function (chunk) {
                chunks.push(chunk);
            });

            newRes.on("end", function () {
                const body = Buffer.concat(chunks);
                const result = JSON.parse(body.toString())
                console.log(result)
                res.json(result)
            });
            newRes.on('error', (err) => {
                console.log('Попали в ошибку')
                console.log(err)
            })
        });

        newReq.end();
    }
}

module.exports = new SiteController()
