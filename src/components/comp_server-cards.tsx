import React, { useState, useEffect, useContext } from 'react';
import '../component_styles/style_server-cards.scss';
import '../App.scss';
import ServerInterface from '../interfaces/server-status';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Servercards = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [servers,setServers ]= useState<ServerInterface[]>([]);
    const [compareServers,setCompareServers]= useState<ServerInterface[]>([]);
    const [count, setCount] = useState(0);
    const [reload, setReload] = useState(0);

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((result) => {
                setServers(result);
                if (count === 0) {
                    setCompareServers(result);
                    setCount(count + 1);
                }
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        // setCount(0);
        const interval = setInterval(() => fetchData(), (1000 * 5));
        return () => clearInterval(interval);
    }, [isLoaded, reload]);

    function checkPermission() {
            if (!('Notification' in window)) {
                console.log('This browser does not support desktop notification');
            } else {
                Notification.requestPermission();
            }
        }
    function pushNotification () {
            Object.keys(servers).map((i) => {
                if (servers[i].status === 'Unavailable') {
                    // if (count < 2) {
                        const options = {
                            body: servers[i].name + ' is unavailable',
                            icon: 'data:image/png;base64,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'
                        };
                        const notification = new Notification('Gillz Dashboard', options);
                        notification.onclick = (event) => {
                            event.preventDefault();
                            window.open(process.env.REACT_APP_BASE + '/' + servers[i].name);
                        };
                        // setCount(count + 1);
                        setCompareServers(servers);
                    // }
                }
            });
    }
    const compareStatus = () => {
        const serverFind = servers.filter(x => x.status === 'Unavailable');
        const compareFind = compareServers.filter(x => x.status === 'Unavailable');
        if (serverFind.length !== compareFind.length) {
            pushNotification();
            setCompareServers(servers);
        }
        else {
            return;
        }
    };

        if (isLoaded) {
            compareStatus();
            // pushNotification();
            checkPermission();
        }

        if (!isLoaded) {
            // return <h2 className={'loading'}>Loading...</h2>
            return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')} alt={'loading'}/></div>;
        }

        if (hasError) {
            return <h2>Error</h2>;
        }
        const statusIcon = (status) => {
            switch(status) {
                case 'Available':
                    return require('../img/statusok.png');
                    break;
                case 'Unavailable':
                    return require('../img/error-icon.svg');
                    break;
                case 'Problem':
                    return require('../img/problem.svg');
                    break;
                case 'Maintenance':
                    return require('../img/maintenance.svg');
                    break;
            }
        };
        const statusClass = (totalStatus) => {
            switch(totalStatus) {
                case 'Available':
                    return '';
                    break;
                case 'Unavailable':
                    return 'alertRed';
                    break;
                case 'Problem':
                    return 'alertYellow';
                    break;
                case 'Maintenance':
                    return 'maintenance';
                    break;
            }
        };
        const fontColor = (status) => {
            switch(status) {
                case 'Unavailable':
                    return 'white';
                    break;
                case 'Problem':
                    return 'white';
                    break;
                case 'Maintenance':
                    return '#323B49';
                    break;
            }
        };

    function sendForm(this: any) {
        const formData = document.querySelector('#modeSelector')! as HTMLFormElement;
        const status = formData.elements['modus'.toString()].value;
        const serverId = formData.elements['serverId'.toString()].value;

        axios.put(process.env.REACT_APP_API_SERVER_STATUS + '/' + serverId, {
            status: status
        })
            .then((response) => {
                console.log(response);
                // props.reload();
                setReload(reload + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    }

        return (
            <Router>
                <Switch>
                    {servers.map((serverData, index) => (
                    <Route path={'/server-' + serverData.id} key={index}>
                        <div className={'advanced-container ' + statusClass(serverData.status)}>
                            <div className={'advanced-container__top'}>
                                <div className={'advanced-container__top__left'}>
                                    <h2>{serverData.name}</h2>
                                    <form id={'modeSelector'}>
                                        <input type={'hidden'} value={serverData.id} name={'serverId'}/>
                                        <select name={'modus'} className={'maintenance__select'} onChange={sendForm}>
                                            <option value={'Available'}>selecteer modus</option>
                                            <option value={'Available'}>Available</option>
                                            <option value={'Problem'}>Problem</option>
                                            <option value={'Unavailable'}>Unavailable</option>
                                            <option value={'Maintenance'}>Maintenance</option>
                                        </select>
                                    </form>
                                </div>
                                <div className={'advanced-container__top__right'}>
                                    <Link to={'/'}>
                                        <img id={'cancel'} className={'cancel'} src={(require('../img/back.svg'))} alt={'add'}/>
                                    </Link>
                                </div>
                            </div>
                            <div className={'advanced-container__grid'}>
                                <div className={'advanced-container__grid__column'}>
                                    <h3>Disk</h3>
                                    <div className={'plot'}>
                                        <Plot
                                            data={[
                                                {
                                                    domain: { x: [0, 1], y: [0, 1] },
                                                    value: serverData.diskUsage / 1000,
                                                    number: {valueformat: '.0f', suffix: 'GB'},
                                                    type: 'indicator',
                                                    mode: 'gauge+number',
                                                    gauge: { axis: { range: [null, serverData.diskTotal / 1000], tickcolor: '#323B49', ticksuffix: 'GB'},
                                                            bar: {color: '#323B49', thickness: 1},
                                                            borderwidth: 2,
                                                            bordercolor: '#323B49'}
                                                    }
                                                ]}
                                            layout={ {width: 300, height: 100, paper_bgcolor: 'transparent', showlegend: false, margin: {l: 0, r: 0, b: 5, t: 20}, displayModeBar: false} }
                                        />
                                    </div>
                                    {/*<p>Disk status: <span>{serverData.disk}</span></p>*/}
                                </div>
                                <div className={'advanced-container__grid__column'}>
                                    <h3>Memory</h3>
                                    <div className={'plot'}>
                                        <Plot
                                            data={[
                                                {
                                                    domain: { x: [0, 1], y: [0, 1] },
                                                    value: serverData.memoryUsage / 1000,
                                                    number: {valueformat: '.0f', suffix: 'GB'},
                                                    type: 'indicator',
                                                    mode: 'gauge+number',
                                                    gauge: { axis: { range: [null, serverData.memoryTotal / 1000], tickcolor: '#323B49', ticksuffix: 'GB'},
                                                        bar: {color: '#323B49', thickness: 1},
                                                        borderwidth: 2,
                                                        bordercolor: '#323B49'}
                                                }
                                            ]}
                                            layout={ {width: 300, height: 100, paper_bgcolor: 'transparent', showlegend: false, margin: {l: 0, r: 0, b: 5, t: 20}, displayModeBar: false} }
                                        />
                                    </div>
                                    {/*<p>Memory status: <span>{serverData.disk}</span></p>*/}
                                </div>
                                <div className={'advanced-container__grid__column'}>
                                    <h3>Dns status</h3>
                                    <div className={'plot'}>
                                        <img src={statusIcon(serverData.status)} alt={'status-ok'}/>
                                        {/*<p>{serverData.status}</p>*/}
                                    </div>
                                    {/*<p>Status: <span>{serverData.status}</span></p>*/}
                                </div>
                                <div className={'advanced-container__grid__column'}>
                                    <h3>Logs</h3>
                                    <table className={'logging__table'}>
                                        <tbody className={'logging__table__body'}>
                                            <tr className={'zendesk-container__table__body__head'}>
                                                <th>ID</th>
                                                <th>Date</th>
                                                <th>Message</th>
                                            </tr>
                                        <tr className={'logging__table__body__data'}>
                                            <td>2</td>
                                            <td>08-12-2020</td>
                                            <td>Logging 2</td>
                                        </tr>
                                            <tr className={'logging__table__body__data'}>
                                                <td>1</td>
                                                <td>07-12-2020</td>
                                                <td>Logging 1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Route>
                    ))}
                    <Route path={'/'}>
                        <div className={'card-container'}>
                            {servers.map((serverData, index) => (
                            <Link to={'server-' + serverData.id} key={index}>
                                <div className={'card-container__card ' + statusClass(serverData.status)} id={'statusItem' + serverData.id}>
                                    <div className={'card-layout'}>
                                        {/*<img src={require('../img/server.svg')} alt={'server-icon'}/>*/}
                                        <div className={'card-layout__text'}>
                                            <h4 id={'title' + serverData.id} style={{color: fontColor(serverData.status)}}>{serverData.name}</h4>
                                            <div className={'card-layout__text--bottomstatus'}>
                                                <p>Disk status: <span id={'disk' + serverData.id} style={{color: fontColor(serverData.status)}}>{serverData.disk}</span></p>
                                                <p>memory status: <span id={'memory' + serverData.id} style={{color: fontColor(serverData.status)}}>{serverData.memory}</span></p>
                                            </div>
                                        </div>
                                        <div className={'currentstatus'}>
                                            <img id={'statusIcon' + serverData.id} src={statusIcon(serverData.status)} alt={'server-icon'}/>
                                            <p id={'status' + serverData.id} style={{color: fontColor(serverData.status)}}>{serverData.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
};

export default Servercards;
