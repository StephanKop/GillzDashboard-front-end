import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_zendesk.scss';
import ZendeskInterface from '../interfaces/zendesk';
import '../App.scss';
import ReactPaginate from 'react-paginate';

const Zendesk = (props)  => {
    const [hasError, setErrors] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [tickets, setTickets] = useState<ZendeskInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [lastArrayItem, setLastArrayItem] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    async function fetchData() {
        const fetchUrl = process.env.REACT_APP_API_ZENDESK;
        const res = await fetch(fetchUrl!!);
        res
            .json()
            .then((result) => {
                setLastArrayItem(result[0].id);
                setTickets(result);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        setCount(count + 1);
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(), (1000 * 20));
        return () => clearInterval(interval);
    }, [isLoaded]);
    if (isLoaded) {
        priorityColor();
        if (count >= 2) {
            pushNotification();
        }
    }

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>;
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

    function priorityColor() {
        Object.keys(tickets).map((i) => {
            if (tickets[i].priority === 'high') {
                const highTickets = document.querySelectorAll('#priorityid' + tickets[i].id);
                highTickets.forEach((el) => {
                    el.removeAttribute('class');
                    el.classList.add('high');
                });
            } else if (tickets[i].priority === 'urgent') {
                const highTickets = document.querySelectorAll('#priorityid' + tickets[i].id);
                highTickets.forEach((el) => {
                    el.removeAttribute('class');
                    el.classList.add('urgent');
                });
            } else if (tickets[i].priority === 'normal') {
                const highTickets = document.querySelectorAll('#priorityid' + tickets[i].id);
                highTickets.forEach((el) => {
                    el.removeAttribute('class');
                    el.classList.add('normal');
                });
            } else if (tickets[i].priority === 'low') {
                const highTickets = document.querySelectorAll('#priorityid' + tickets[i].id);
                highTickets.forEach((el) => {
                    el.removeAttribute('class');
                    el.classList.add('low');
                });
            }
        });
    }

    function pushNotification () {
        if (lastArrayItem !== tickets[0].id) {
            setLastArrayItem(tickets[0].id);
            setTimeout(() =>{
            const options = {
                body: tickets[0].subject,
                icon: 'data:image/png;base64,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'
            };
            const notification = new Notification('Gillz Dashboard', options);
            notification.onclick = (event) => {
                event.preventDefault();
                window.open(process.env.REACT_APP_BASE + '/issues');
            };
            }, 6000);
        }
    }
    const pageHeight = document.body.scrollHeight;
    const dividedHeight = pageHeight / 70;
    const PER_PAGE = Math.round(dividedHeight);
    const offset = currentPage * PER_PAGE;
    const currentPageData = tickets
        .slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(tickets.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className={'zendesk-container'} style={{height: props.containerHeight}}>
            <table className={'zendesk-container__table'} style={{width: props.tableWidth}}>
                <tbody className={'zendesk-container__table__body'}>
                    <tr className={'zendesk-container__table__body__head'}>
                        <th>Id</th>
                        <th>Assigned</th>
                        <th>Subject</th>
                        <th style={{display: props.descriptionDisplay}}>Description</th>
                        <th>Created</th>
                        <th>Last update</th>
                        <th>Status</th>
                    </tr>
                    {currentPageData.map((ticketData, index) => (
                        <tr key={index} className={'zendesk-container__table__body__data'} onClick={(e) => {
                            const url: string = 'https://gillz.zendesk.com/agent/tickets/' + ticketData.id;
                            window.open(url);
                        }}>
                            <td style={{maxWidth: props.columnWidth}}>{ticketData.id}</td>
                            <td style={{maxWidth: props.columnWidth}}>{ticketData.name ? ticketData.name : 'Niet toegewezen'}</td>
                            <td style={{maxWidth: props.columnWidth}}>{ticketData.subject}</td>
                            <td style={{maxWidth: props.columnWidth, display: props.descriptionDisplay}}>{ticketData.description}</td>
                            <td style={{maxWidth: props.columnWidth}}>{ticketData.created_at.split('T', 1)[0]}</td>
                            <td style={{maxWidth: props.columnWidth}}>{ticketData.updated_at.split('T', 1)[0]}</td>
                            <td style={{maxWidth: props.columnWidth}} id={'priorityid' + ticketData.id}>{ticketData.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            />
        </div>
    );
};

export default Zendesk;
