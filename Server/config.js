const config = (email, GlobalAPIKey) => {
    return {
        options: {
            "method": "POST",
            "hostname": "api.cloudflare.com",
            "port": null,
            "headers": {
                "Content-Type": "application/json",
                "X-Auth-Email": email,
                "X-Auth-Key": GlobalAPIKey
            }
        }
    }
}

module.exports = config
