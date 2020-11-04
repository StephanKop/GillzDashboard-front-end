import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_deadlines.scss';
import '../App.scss';
import Dialog_deadlines from "./comp_dialog_deadlines";
import Dialog_deadlines_edit from "./comp_dialog_deadlines_edit";

const Deadlines = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)
    const [DeadlineIsLoaded, setDeadlineIsLoaded] =  useState(false)
    const [count, setCount] = useState(0);
    const [deadlines,setDeadlines ] = useState<any[]>([])
    const [deadline,setDeadline ] = useState<any[]>([{
        id: 0,
        name: "",
        deadline: Date,
        link: "",
        isActive: Boolean,
        members: []
    }])
    let [editLink] = useState([{
        link: "http://localhost:3001/deadlines/5"
    }]);

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
                setDeadlines(res);
            })
            .catch(err => setErrors(err));
        return true;
    }

    async function fetchDeadline() {
        const res = await fetch(editLink[0].link);
        res
            .json()
            .then((res) => {
                setDeadline(res);
                setTimeout(function() {
                    setDeadlineIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
        return true;
    }


    useEffect(() => {
        fetchData();
        console.log('joe');
        // let interval = setInterval(() => fetchData(), (1000 * 60 * 60))
        // return () => clearInterval(interval)
    }, [isLoaded, count]);

    function reload () {
        setCount(count + 1);
    }

    if (isLoaded) {
        // deadlineLength();
    }

    if (DeadlineIsLoaded) {
        openEditForm();
    }

    if (!isLoaded) {
        // return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function deadlineLength(deadline: any): number {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const joe = new Date(deadline.deadline);
        // @ts-ignore
        let diffDays = Math.round(Math.round((joe - currentDate) / oneDay));
        // let deadlineWidth = document.querySelectorAll("#deadline" + deadlines[i].id);
        return diffDays;


        // Object.keys(deadlines).map((i) => {
        //
        //     // Math.clamp(diffDays, 30, 100)
        //     deadlineWidth.forEach((element) => {
        //         element.style.width = diffDays + "%";
        //     });

            // if (0 >= diffDays) {
            //     let zero = document.querySelectorAll("#deadline" + deadlines[i].id);
            //     let days = document.querySelectorAll("#days" + deadlines[i].id);
            //     zero.forEach(function (el) {
            //         el.classList.add('hidden');
            //     });
            // } else if (0 <= diffDays && diffDays < 9) {
            //     let zero = document.querySelectorAll("#deadline" + deadlines[i].id);
            //     let days = document.querySelectorAll("#days" + deadlines[i].id);
            //     zero.forEach(function (el) {
            //         el.classList.add('zerodays');
            //         // el.classList.add('deadline--alert');
            //     });
            // } else if (10 <= diffDays && diffDays < 19) {
            //         let ten = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         ten.forEach(function (el) {
            //             el.classList.add('tendays');
            //         });
            // } else if (20 <= diffDays && diffDays < 29) {
            //         let twenty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         twenty.forEach(function (el) {
            //             el.classList.add('twentydays');
            //         });
            // } else if (30 <= diffDays && diffDays < 39) {
            //         let thirty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         thirty.forEach(function (el) {
            //             el.classList.add('thirtydays');
            //         });
            // } else if (40 <= diffDays && diffDays < 49) {
            //         let fourty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         fourty.forEach(function (el) {
            //             el.classList.add('fourtydays');
            //         });
            // } else if (50 <= diffDays && diffDays < 59) {
            //         let fifty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         fifty.forEach(function (el) {
            //             el.classList.add('fiftydays');
            //         });
            // } else if (60 <= diffDays && diffDays < 69) {
            //         let sixty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         sixty.forEach(function (el) {
            //             el.classList.add('sixtydays');
            //         });
            // } else if (70 <= diffDays && diffDays < 79) {
            //         let seventy = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         seventy.forEach(function (el) {
            //             el.classList.add('seventydays');
            //         });
            // } else if (80 <= diffDays && diffDays < 89) {
            //         let eighty = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         eighty.forEach(function (el) {
            //             el.classList.add('eightydays');
            //         });
            // } else if (90 <= diffDays && diffDays < 99) {
            //         let ninety = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         ninety.forEach(function (el) {
            //             el.classList.add('ninetydays');
            //         });
            // } else if (diffDays <= 100) {
            //         let hundred = document.querySelectorAll("#deadline" + deadlines[i].id);
            //         hundred.forEach(function (el) {
            //             el.classList.add('hundreddays');
            //         });
            // }
        // });
    }

    function setApiId(id) {
        const serverId = id;
        editLink[0].link = process.env.REACT_APP_API_DEADLINES + "/" + serverId;
        fetchDeadline();
    }

    function openEditForm() {
        const modal = (document.getElementById('deadlineEditModal')!);
        modal.classList.add('visibleAnim');
        const modalBackground = (document.getElementById('modalEditBackground')!);
        modalBackground.classList.add('visible');
    }

    return (
        <div className={'deadlines-container'}>
            {deadlines.map((serverData, index) => (
                <div id={"deadline" + serverData.id} className={'deadline'} key={index} style={{width: deadlineLength(serverData) + '%'}}>
                    <div className={'deadline-leftside'}>
                        <h3>{serverData.name}</h3>
                        <div className={'deadline-leftside__member-container'}>
                            {serverData.members.map((memberData, index) => (
                                <img src={memberData.image} alt={memberData.name} key={index}/>
                            ))}
                        </div>
                    </div>
                    <div className={'deadline-rightside'}>
                        <div className={'days-remaining'}>
                            <p id={'days' + serverData.id}>{(new Date (serverData.deadline)).toLocaleDateString("nl")}</p>
                        </div>
                        <div className={'deadline-rightside__add-image'} onClick={() => setApiId(serverData.id)}>
                            <img id={'edit'} src={(require('../img/edit.svg'))} alt={'edit'}/>
                        </div>
                    </div>
                    <div></div>
                </div>
            ))}
            <Dialog_deadlines memberLink={process.env.REACT_APP_API_MEMBERS} reload={reload}/>
            <Dialog_deadlines_edit
                deadlineLink={editLink[0].link}
                memberLink={process.env.REACT_APP_API_MEMBERS}
                id={deadline[0].id}
                name={deadline[0].name}
                deadline={deadline[0].deadline}
                link={deadline[0].link}
                isActive={deadline[0].isActive}
                members={deadline[0].members}
            />
        </div>
    )
}

export default Deadlines;
