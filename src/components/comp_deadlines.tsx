import React, {useState, useEffect} from 'react';
import '../component_styles/style_comp_deadlines.scss';
import '../App.scss';
import DialogDeadlines from './comp_dialog_deadlines';
import DialogDeadlinesEdit from './comp_dialog_deadlines_edit';
import DeadlinesInterface from '../interfaces/deadlines';
import DeadlineInterface from '../interfaces/deadline';

const Deadlines = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [DeadlineIsLoaded, setDeadlineIsLoaded] =  useState(false);
    const [count, setCount] = useState(0);
    const [deadlines,setDeadlines ] = useState<DeadlinesInterface[]>([]);
    const [slicedDeadlines,setSlicedDeadlines ] = useState<DeadlinesInterface[]>([]);
    const [fetchUrl, setFetchUrl] = useState(props.apiLink);
    const [deadline,setDeadline ] = useState<DeadlineInterface[]>([{
        id: 0,
        project: '',
        name: '',
        deadline: '2020-01-02T00:00:00.000Z',
        link: '',
        isActive: false,
        members: [{
            id: 4,
            name: '',
            image: '',
            present: true
        },{
            id: 0,
            name: '',
            image: '',
            present: true
        },{
            id: 0,
            name: '',
            image: '',
            present: true
        }
        ]
    }]);
    const [editLink] = useState([{
        link: ''
    }]);


    async function fetchData() {
        const res = await fetch(fetchUrl);
        res
            .json()
            .then((result) => {
                setDeadlines(result);
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
        return true;
    }

    async function fetchDeadline() {
        const res = await fetch(editLink[0].link);
        res
            .json()
            .then((result) => {
                setDeadline(result);
                setTimeout(() => {
                    setDeadlineIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
        return true;
    }

    useEffect(() => {
        fetchData();
        heightSlice(props.frontPage);
    }, [isLoaded, count, fetchUrl]);

    function reload () {
        setCount(count + 1);
    }

    if (DeadlineIsLoaded) {
        openEditForm();
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

    function deadlineLength(deadlineToCalc: any): number {
        const currentDate = new Date();
        const milPerDay = 1000 * 60 * 60 * 24;
        const deadlineDate = new Date(deadlineToCalc.deadline);
        const diffDays = Math.abs(currentDate.getTime() - deadlineDate.getTime());
        const newDays = Math.ceil(diffDays / milPerDay);
        return newDays;
    }
    const setAwarenessColor = (daysRemain, present) => {
        if (daysRemain <= 5) {
            return 'linear-gradient(90deg, rgba(249,72,76,1) 0%, rgba(249,72,76,1)' + (100 - daysRemain) + '%' + ', rgba(255,255,255,0)' + (100 - daysRemain + '%' + ')');
        } else if (present.find((element) => element === false) === false) {
            return 'linear-gradient(90deg, rgba(255,181,0,1) 0%, rgba(255,181,0,1)' + (100 - daysRemain) + '%' + ', rgba(255,255,255,0)' + (100 - daysRemain) + '%' + ')';
        } else {
            return 'linear-gradient(90deg, rgba(50, 59, 73,0.7) 0%, rgba(50, 59, 73,0.7)' + (100 - daysRemain) + '%' + ', rgba(255,255,255,0)' + (100 - daysRemain + '%' + ')');
        }
    };

    function setApiId(id) {
        const serverId = id;
        editLink[0].link = process.env.REACT_APP_API_DEADLINES + '/' + serverId;
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
            reload();
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.add('activeSort');
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.remove('activeSort');
        } else if (sortBy === 'name') {
            setFetchUrl(process.env.REACT_APP_API_DEADLINES_ORDEREDBYNAME);
            reload();
            const sortByName = document.getElementById('sortByName')!;
            sortByName.classList.add('activeSort');
            const sortByDate = document.getElementById('sortByDate')!;
            sortByDate.classList.remove('activeSort');
        }
    }

    const heightSlice = (value) => {
        if (value) {
            const container = document.getElementById('deadlines-container');
            const offsetHeight = container!.offsetHeight;
            const dividedHeight = offsetHeight / 60;
            const slicedArray = deadlines.slice(0, Math.round(dividedHeight));
            setSlicedDeadlines(slicedArray);
        } else {
            setSlicedDeadlines(deadlines);
        }
    };

    return (
        <div className={'deadlines-container'} id={'deadlines-container'}>
            <div className={'deadlines-container__sort'}>
                <h3 className={'deadlines-container__row--title'} style={{display: props.displayTitle}}>Sorteer op</h3>
                <button id={'sortByDate'} onClick={() => sorted('date')} style={{display: props.displayDateSort}} className={'deadlines-container__sort--button activeSort'}>Datum</button>
                <button id={'sortByName'} onClick={() => sorted('name')} style={{display: props.displayNameSort}} className={'deadlines-container__sort--button'}>Naam</button>
            </div>
            {deadlines.slice(0, props.maxDeadlines).map((deadlineData, index) => (
                <div key={index}>
                <div id={'deadline' + deadlineData.id} className={'deadline'} key={index} style={{background: setAwarenessColor(deadlineLength(deadlineData), deadlineData.members.map((memberPresent) => (memberPresent.present)))}}>
                    <div className={'deadline-leftside'}>
                        <div className={'deadline-leftside__project'}>
                            <h3>{deadlineData.project}</h3>
                        </div>
                        <div className={'deadline-leftside__title'}>
                            <p>{deadlineData.name}</p>
                        </div>
                        <div className={'deadline-leftside__member-container'}>
                            {deadlineData.members.map((memberData, memberIndex) => (
                                <img src={memberData.image} alt={memberData.name} key={memberIndex} id={'present' + memberData.present}/>
                            ))}
                        </div>
                    </div>
                    <div className={'deadline-rightside'}>
                        <div className={'days-remaining'}>
                            <p id={'days' + deadlineData.id}>{deadlineLength(deadlineData)} Dagen</p>
                        </div>
                        <div className={'deadline-rightside__add-image'} onClick={() => setApiId(deadlineData.id)} style={{opacity: props.displayEdit}}>
                            <img id={'edit'} src={(require('../img/edit.svg'))} alt={'edit'}/>
                        </div>
                    </div>
                </div>
                </div>
            ))}
            <DialogDeadlines memberLink={process.env.REACT_APP_API_MEMBERS} projectsLink={process.env.REACT_APP_API_DEVOPS_PROJECTS} reload={reload}/>
            <DialogDeadlinesEdit
                deadlineLink={editLink[0].link}
                memberLink={process.env.REACT_APP_API_MEMBERS}
                id={deadline[0]?.id}
                name={deadline[0]?.name}
                deadline={deadline[0]?.deadline}
                link={deadline[0]?.link}
                isActive={deadline[0]?.isActive}
                project={deadline[0]?.project}
                member1={deadline[0]?.members[0]}
                member2={deadline[0]?.members[1]}
                member3={deadline[0]?.members[2]}
                projectsLink={process.env.REACT_APP_API_DEVOPS_PROJECTS}
                reload={reload}
            />
        </div>
    );
};

export default Deadlines;

