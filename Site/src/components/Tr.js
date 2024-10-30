import React, {useEffect} from "react";
import Spinner from 'react-bootstrap/Spinner';
import AddSite from "./Tr/AddSite";


const Tr = ({site, Server, index, authId, setSiteList, siteList}) => {

    useEffect(() => {
        sendDeleteSiteRequest(site)
    }, [])

    const sendDeleteSiteRequest = (site) => {
        fetch('http://localhost:8888/api/deleteSite', {
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
                const newArr = siteList.filter(el => el !== site)
                setSiteList([...newArr])
            })
            .catch(err => console.log(err))
    }

    const renderRemoveElement = () => {
        if (!Server) return null
        if (site === siteList[0]) return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        return <button onClick={() => sendDeleteSiteRequest(site)}>Удалить</button>
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{site}</td>
            <td>{Server && renderRemoveElement()}</td>
            <td>
                <AddSite Server={Server} site={site} authId={authId}/>
            </td>
            <td>

            </td>
            <td></td>
        </tr>)
}

export default Tr
