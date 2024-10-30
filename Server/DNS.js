const http = require("https");
const config = require('./config')
const {AccountID, email, GlobalAPIKey, idx, siteNames, server} = require('./config')
const createZone = require('./CreateZone')

function setDNS(ZoneID) {

    const options = {
        "method": "POST",
        "hostname": "api.cloudflare.com",
        "port": null,
        "path": `/client/v4/zones/${ZoneID}/dns_records`,
        "headers": {
            "Content-Type": "application/json",
            "X-Auth-Email": email,
            "X-Auth-Key": GlobalAPIKey
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log('DNS запись добалена');
        });
    });

    req.write(JSON.stringify({
        content: server,
        name: siteNames[idx],
        proxied: true,
        type: 'A',
        comment: 'Domain verification record',
        ttl: 3600
    }));
    req.end();

}


module.exports = setDNS
