import React, { useState, useEffect } from 'react';
import '../component_styles/style_deadlines.scss';
import '../App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Deadlines = ()  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [deadlines,setDeadlines ]= useState<any[]>([])

    async function fetchData() {
        const res = await fetch("http://localhost:3001/deadlines");
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
                setDeadlines(res);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        let interval = setInterval(() => fetchData(), (1000 * 60 *60))
        return () => clearInterval(interval)
    }, [isLoaded]);

    if (isLoaded) {
        deadlineLength();
    }

    if (!isLoaded) {
        return <h2>Loading...</h2>
    }

    function deadlineLength() {
        Object.keys(deadlines).map((i) => {
            if (deadlines[i].status === "Unavailable") {

            }
            switch(deadlines[i].days) {
                case "100":
                    let hundred = document.querySelectorAll("#deadline" + deadlines[i].id);
                    hundred.forEach(function (el) {
                        el.classList.add('hundreddays');
                    });
                break;
                case "90":
                    let ninety = document.querySelectorAll("#deadline" + deadlines[i].id);
                    ninety.forEach(function (el) {
                        el.classList.add('ninetydays');
                    });
                break;
                case "80":
                    let eighty = document.querySelectorAll("#deadline" + deadlines[i].id);
                    eighty.forEach(function (el) {
                        el.classList.add('eightydays');
                    });
                break;
                case "70":
                    let seventy = document.querySelectorAll("#deadline" + deadlines[i].id);
                    seventy.forEach(function (el) {
                        el.classList.add('seventydays');
                    });
                break;
            }
        });
    }

    // @ts-ignore
    return (
        <div className={'deadlines-container'}>
            {deadlines.map((serverData, index) => (
            <Link to={"project" + "-" + serverData.name} key={index}>
                <div id={"deadline" + serverData.id} className={'deadline'}>
                    <div className={'deadline-leftside'}>
                        <h3>{serverData.name}</h3>
                        <div className={'deadline-leftside__member-container'}>
                            {serverData.members.map((memberData, index) => (
                                <img src={memberData.image} alt={memberData.name} key={index}/>
                            ))}
                        </div>
                    </div>
                    <div className={'days-remaining'}>
                        <p>{serverData.deadline}</p>
                    </div>
                </div>
            </Link>
            ))}
        </div>
    )
}

export default Deadlines;
