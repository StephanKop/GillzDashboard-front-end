import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_zendesk.scss';
import '../App.scss';

const Zendesk = (props)  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [tickets, setTickets] = useState<any[]>([])
    const  [users, setUsers] = useState<any[]>([])

    async function fetchData() {
        const fetchUrl = process.env.REACT_APP_API_ZENDESK;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((res) => {
                setTickets(res.tickets);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        return true;
    }
    async function fetchZendeskUser() {
        const fetchUrl = process.env.REACT_APP_API_ZENDESK_USER;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((res) => {
                setUsers(res.users);
            })
            .catch(err => setErrors(err));
        return true;
    }

    useEffect(() => {
        fetchData();
        fetchZendeskUser();
        userName()
        console.log(users);
        console.log(tickets);
        let interval = setInterval(() => fetchData(), (1000 * 5))
        return () => clearInterval(interval)
    }, [isLoaded]);

    if (isLoaded) {
        // return <h2>Loaded!</h2>
        priorityColor()
    }

    if (!isLoaded) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function userName() {
        // if (tickets.find(users => users.id)) {
        //     setTickets(users);
        // }
        tickets.forEach(function() {
            if (tickets.find(users => users.id)) {
                const linked = tickets.find(users => users.id);
                // linked.push(users => users.id);
                linked.name = users.find(tickets => tickets.requestor_id);
                console.log(linked);
            }
        })
    }

    function priorityColor() {
        Object.keys(tickets).map((i) => {
            if (tickets[i].priority === 'high') {
                let highTickets = document.querySelectorAll("#priorityid" + tickets[i].id);
                highTickets.forEach(function (el) {
                    el.classList.add('high');
                });
            } else if (tickets[i].priority === 'urgent') {
                let highTickets = document.querySelectorAll("#priorityid" + tickets[i].id);
                highTickets.forEach(function (el) {
                    el.classList.add('urgent');
                });
            } else if (tickets[i].priority === 'normal') {
                let highTickets = document.querySelectorAll("#priorityid" + tickets[i].id);
                highTickets.forEach(function (el) {
                    el.classList.add('normal');
                });
            } else if (tickets[i].priority === 'low') {
                let highTickets = document.querySelectorAll("#priorityid" + tickets[i].id);
                highTickets.forEach(function (el) {
                    el.classList.add('low');
                });
            }
        })
    }

    return (
        <div className={'zendesk-container'}>
            <table className={'zendesk-container__table'}>
                <tbody className={'zendesk-container__table__body'}>
                    <tr className={'zendesk-container__table__body__head'}>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                    {tickets.map((ticketData, index) => (
                        <tr key={index} className={'zendesk-container__table__body__data'}>
                            <td>{ticketData.subject}</td>
                            <td>{ticketData.description}</td>
                            <td>{ticketData.created_at}</td>
                            <td id={'priorityid' + ticketData.id}>{ticketData.priority}</td>
                            <td>{ticketData.status}</td>
                            <td><a href={'https://gillztest.zendesk.com/agent/tickets/' + ticketData.id}>Link</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Zendesk;
