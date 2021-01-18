import React, { useState, useEffect } from 'react';
import buildsInterface from '../interfaces/builds';
import '../component_styles/style_comp_builds.scss';
import '../App.scss';

const Builds = (props)  => {
    const [hasError, setErrors] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [requests, setRequests] = useState<buildsInterface[]>([]);
    const [slicedRequests, setSlicedRequests] = useState<buildsInterface[]>([]);
    const [count, setCount] = useState<number>(0);

    async function fetchData() {
        const fetchUrl = process.env.REACT_APP_API_DEVOPS_REQUESTS;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((result) => {
                setRequests(result);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        setCount(count + 1);
    }

    useEffect(() => {
        fetchData();
        heightSlice(props.frontPage);
        const interval = setInterval(() => fetchData(), (1000 * 20));
        return () => clearInterval(interval);
    }, [isLoaded]);

    const heightSlice = (value) => {
        if (value) {
            const container = document.getElementById('builds-container');
            const offsetHeight = container!.offsetHeight;
            const dividedHeight = offsetHeight / 60;
            setSlicedRequests(requests.slice(0, Math.round(dividedHeight)));
        } else {
            setSlicedRequests(requests);
        }
    };

    const statusIcon = (status) => {
        switch(status) {
            case 0:
                return 'success';
                break;
            case 2:
                return 'failed';
                break;
            case 3:
                return 'cancelled';
                break;
            default:
                return 'running';
                break;
        }
    };
    return (
        <div className={'builds-container'} id={'builds-container'} style={{height: props.containerHeight}}>
            <table className={'builds-container__table'} style={{width: props.tableWidth}}>
                <tbody className={'builds-container__table__body'}>
                <tr className={'builds-container__table__body__head'} style={{display: props.tableRow}}>
                    <th>Id</th>
                    <th>Naam</th>
                    <th>Type</th>
                    <th style={{display: props.queueDisplay}}>Queue time</th>
                    <th>Finish time</th>
                    <th>Resultaat</th>
                </tr>
                {slicedRequests.map((requestsData, index) => (
                    <tr key={index} className={'builds-container__table__body__data'} onClick={(e) => {
                        const url: string = requestsData.definition._links.web.href;
                        window.open(url);
                    }}>
                        <td style={{maxWidth: props.columnWidth}}>{requestsData.requestId}</td>
                        <td style={{maxWidth: props.columnWidth}} title={requestsData.definition.name}>{requestsData.definition.name}</td>
                        <td style={{maxWidth: props.columnWidth}} title={requestsData.planType}>{requestsData.planType}</td>
                        <td style={{maxWidth: props.columnWidth, display: props.queueDisplay}} title={requestsData.queueTime}>{new Date(requestsData.queueTime).toLocaleString()}</td>
                        <td style={{maxWidth: props.columnWidth}} title={requestsData.finishTime}>{requestsData.finishTime ? new Date(requestsData.finishTime).toLocaleString() : 'Processing'}</td>
                        <td id={'result' + requestsData.result} className={statusIcon(requestsData.result)} style={{maxWidth: props.columnWidth}}> </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Builds;
