import React from "react";

const AddSite = ({Server, site, authId}) => {
    const sendAddSiteRequest = (site) => {
        fetch('http://localhost:8888/api/addSite', {
            method: 'POST',
            body: JSON.stringify({
                Server,
                site,
                authId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    return <button>Добавить сайт</button>
}

export default AddSite
