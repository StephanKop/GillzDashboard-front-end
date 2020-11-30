import React, {useState, useEffect, useImperativeHandle, useContext} from 'react';
import '../component_styles/style_comp_deadlines.scss';
import '../App.scss';
import Dialog_deadlines from "./comp_dialog_deadlines";
import Dialog_deadlines_edit from "./comp_dialog_deadlines_edit";
import deadlinesInterface from "../interfaces/deadlines";
import moment from "moment";

const Deadlines = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)
    const [DeadlineIsLoaded, setDeadlineIsLoaded] =  useState(false)
    const [count, setCount] = useState(0);
    let [deadlines,setDeadlines ] = useState<deadlinesInterface[]>([])
    let [fetchUrl, setFetchUrl] = useState(props.apiLink)
    const [deadline,setDeadline ] = useState([{
        id: 0,
        name: "",
        deadline: Date,
        link: "",
        isActive: Boolean,
        members: []
    }])
    let [editLink] = useState([{
        link: ""
    }]);


    async function fetchData() {
        const res = await fetch(fetchUrl);
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
        setAlertColor();
        // let interval = setInterval(() => fetchData(), (1000 * 60 * 60))
        // return () => clearInterval(interval)
    }, [isLoaded, count, fetchUrl]);

    function reload () {
        setCount(count + 1);
        setAlertColor();
    }

    if (isLoaded) {
        setAlertColor();
        // setTimeout(addGradientLength, 3000)
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
        const oneDay = 24 * 60 * 60;
        const milPerDay = 1000 * 60 * 60 * 24;
        const deadlineDate = new Date(deadline.deadline);
        let diffDays = Math.abs(currentDate.getTime() - deadlineDate.getTime());
        let newDays = Math.ceil(diffDays / milPerDay);
        return newDays;
    }

    function setAlertColor() {
        Object.keys(deadlines).map((i) => {
        if (deadlineLength(deadlines[i]) <= 5 ) {
                let daysRemaining = document.querySelectorAll("#deadline" + deadlines[i].id);
                // @ts-ignore
                daysRemaining.forEach(function (el: HTMLElement) {
                    el.style.background = "linear-gradient(90deg, rgba(249,72,76,1) 0%, rgba(249,72,76,1)" + (100 - deadlineLength(deadlines[i])) + '%' + ", rgba(255,255,255,1)" + (100 - deadlineLength(deadlines[i])) + '%' + ")";
                });
            }
        const members = deadlines[i].members;
        members.forEach(function (el) {
                if (el.present === false) {
                    const unavailableMember = document.querySelectorAll("#deadline" + deadlines[i].id);
                    const unavailableMemberImage = document.querySelectorAll("#presentfalse");
                    unavailableMemberImage.forEach(function (el) {
                        el.classList.add('unavailableMember');
                    })
                    // @ts-ignore
                    unavailableMember.forEach(function (el:HTMLElement) {
                        el.style.background = "linear-gradient(90deg, rgba(255,181,0,1) 0%, rgba(255,181,0,1)" + (100 - deadlineLength(deadlines[i])) + '%' + ", rgba(255,255,255,1)" + (100 - deadlineLength(deadlines[i])) + '%' + ")";
                    })
                }
            })
        })
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
        setDeadlineIsLoaded(false);
    }

    function sorted(sortBy) {
        if (sortBy === 'date') {
            setFetchUrl(process.env.REACT_APP_API_DEADLINES_ORDEREDBYDATE);
            setCount(count + 1);
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.add('activeSort');
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.remove('activeSort');
        } else if (sortBy === 'name') {
            setFetchUrl(process.env.REACT_APP_API_DEADLINES_ORDEREDBYNAME);
            setCount(count + 1);
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.add('activeSort');
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.remove('activeSort');
        }
    }

    return (
        <div className={'deadlines-container'}>
            <div className={'deadlines-container__sort'}>
                <h3 className={'deadlines-container__row--title'} style={{display: props.displayTitle}}>Deadlines</h3>
                <button id={'sortByDate'} onClick={() => sorted('date')} style={{display: props.displayDateSort}} className={'deadlines-container__sort--button activeSort'}>Datum</button>
                <button id={'sortByName'} onClick={() => sorted('name')} style={{display: props.displayNameSort}} className={'deadlines-container__sort--button'}>Naam</button>
            </div>
            {deadlines.map((deadlineData, index) => (
                <div id={"deadline" + deadlineData.id} className={'deadline'} key={index} style={{background: "linear-gradient(90deg, rgba(50, 59, 73,1) 0%, rgba(50, 59, 73,1)" + (100 - deadlineLength(deadlineData)) + '%' + ", rgba(255,255,255,1)"+ (100 - deadlineLength(deadlineData)) + '%' +")"}}>
                    <div className={'deadline-leftside'}>
                        <div className={'deadline-leftside__title'}>
                            <h3>{deadlineData.name}</h3>
                        </div>
                        <div className={'deadline-leftside__member-container'}>
                            {deadlineData.members.map((memberData, index) => (
                                <img src={memberData.image} alt={memberData.name} key={index} id={"present" + memberData.present}/>
                            ))}
                        </div>
                    </div>
                    <div className={'deadline-rightside'}>
                        <div className={'days-remaining'}>
                            {/*<p id={'days' + serverData.id}>{(new Date (serverData.deadline)).toLocaleDateString("nl")}</p>*/}
                            <p id={'days' + deadlineData.id}>{deadlineLength(deadlineData)} Dagen</p>
                        </div>
                        <div className={'deadline-rightside__add-image'} onClick={() => setApiId(deadlineData.id)} style={{opacity: props.displayEdit}}>
                            <img id={'edit'} src={(require('../img/edit.svg'))} alt={'edit'}/>
                        </div>
                    </div>
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
                reload={reload}
            />
        </div>
    )
}

export default Deadlines;

