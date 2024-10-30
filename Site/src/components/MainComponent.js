import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import Tr from './Tr'
import Dropdown from 'react-bootstrap/Dropdown';

const servers = {
    adminVPS: '91.200.84.27',
    appletec: '193.164.17.173',
    adminVPSwordpress: '195.93.252.178'
}

function MainComponent() {
    const [siteList, setSiteList] = useState([])
    const [bigInput, setBigInput] = useState('')
    const [Server, setServer] = useState('')
    const [authId, setAuthId] = useState('')

    useEffect(() => {
        const newArr = bigInput.split(' ').filter(el => el)
        setSiteList(newArr)
    }, [bigInput])

    const authRequest = () => {
        fetch('http://localhost:8888/api/userAuth', {
            method: 'POST',
            body: JSON.stringify({
                Server,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAuthId(data.doc.auth.$id)
            })
            .catch(err => console.log(err))
    }

    const renderTr = () => {
        return [siteList[0]].map((site, index) => (
            <Tr
                key={site}
                site={site}
                Server={Server}
                index={index + 1}
                authId={authId}
                siteList={siteList}
                setSiteList={setSiteList}
            />
        ))
    }


    return (
        <div>
            <div>Список сайтов</div>
            <input
                placeholder={'Sites'}
                style={styles.bigInput}
                type={'text'}
                value={bigInput}
                onInput={(e) => setBigInput(e.target.value)}/>

            <div style={{marginBottom: 10, marginLeft: 10}}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {Server || 'Server'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={() => setServer(servers.adminVPS)}>{servers.adminVPS}</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setServer(servers.appletec)}>{servers.appletec}</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => setServer(servers.adminVPSwordpress)}>{servers.adminVPSwordpress}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {authId ? authId : <button onClick={authRequest}>Авторизация</button>}
            </div>

            <span>Сайтов: {siteList.length}</span>

            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Site</th>
                    <th>Удалить</th>
                    <th>Добавить</th>
                    <th>Add DNS</th>
                    <th>DNS Servers</th>
                </tr>
                </thead>
                <tbody>
                {renderTr()}
                </tbody>
            </Table>
        </div>
    );
}

const styles = {
    input: {
        width: 500,
        display: 'block',
        border: '1px solid grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    bigInput: {
        width: '98%',
        display: 'block',
        border: '1px solid grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export default MainComponent;
