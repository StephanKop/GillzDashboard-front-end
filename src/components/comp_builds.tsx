import React, { useState, useEffect } from 'react';
import buildsInterface from "../interfaces/builds"
import '../component_styles/style_comp_builds.scss';
import '../App.scss';

const Builds = (props)  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [requests, setRequests] = useState<buildsInterface[]>([])
    let    [count, setCount] = useState<number>(0)

    async function fetchData() {
        const fetchUrl = process.env.REACT_APP_API_DEVOPS_REQUESTS;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((res) => {
                setRequests(res);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        setCount(count++);
    }

    useEffect(() => {
        fetchData();
        let interval = setInterval(() => fetchData(), (1000 * 20))
        return () => clearInterval(interval)
    }, [isLoaded]);

    if(isLoaded) {
        resultStatus();
    }

    function resultStatus() {
        Object.keys(requests).map((i) => {
            if (requests[i].result === 0) {
                let success = document.querySelectorAll('#result' + requests[i].result);
                success.forEach(function (el) {
                    el.classList.remove('failed');
                    el.classList.remove('cancelled');
                    el.classList.remove('running');
                    el.classList.add('success');
                });
            } else if (requests[i].result === 1) {
                let running = document.querySelectorAll('#result' + requests[i].result);
                running.forEach(function (el) {
                    el.classList.remove('success');
                    el.classList.remove('failed');
                    el.classList.add('running');
                });
            } else if (requests[i].result === 2) {
                let failed = document.querySelectorAll('#result' + requests[i].result);
                failed.forEach(function (el) {
                    el.classList.remove('success');
                    el.classList.remove('running');
                    el.classList.remove('cancelled');
                    el.classList.add('failed');
                });
            } else if (requests[i].result === 3) {
                let cancelled = document.querySelectorAll('#result' + requests[i].result);
                cancelled.forEach(function (el) {
                    el.classList.remove('success');
                    el.classList.remove('failed');
                    el.classList.remove('running');
                    el.classList.add('cancelled');
                });
            }
        })
    }

    return (
        <div className={'builds-container'} style={{height: props.containerHeight}}>
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
                {requests.map((requestsData, index) => (
                    <tr key={index} className={'builds-container__table__body__data'} onClick={(e) => {
                        let url: string = requestsData.definition._links.web.href;
                        window.open(url);
                    }}>
                        <td style={{maxWidth: props.columnWidth}}>{requestsData.requestId}</td>
                        <td style={{maxWidth: props.columnWidth}}>{requestsData.definition.name}</td>
                        <td style={{maxWidth: props.columnWidth}}>{requestsData.planType}</td>
                        <td style={{maxWidth: props.columnWidth, display: props.queueDisplay}}>{new Date(requestsData.queueTime).toLocaleString()}</td>
                        <td style={{maxWidth: props.columnWidth}}>{new Date(requestsData.finishTime).toLocaleString()}</td>
                        <td id={'result' + requestsData.result} style={{maxWidth: props.columnWidth}}></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Builds;
