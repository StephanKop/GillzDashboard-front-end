import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_deadlines.scss';
import '../App.scss';
import axios from 'axios';

const Dialog_deadlines = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)
    const [DeadlineIsLoaded, setDeadlineIsLoaded] =  useState(false)
    const [members,setMembers ]= useState<any[]>([])
    const [deadline,setDeadline ]= useState<any[]>([])
    let [members0, setMembers0]= useState(Number);
    let [members1, setMembers1]= useState(Number);
    let [members2, setMembers2]= useState(Number);

    async function fetchData() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
                setMembers(res);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        // let interval = setInterval(() => fetchData(), (1000))
        // return () => clearInterval(interval)
    }, [isLoaded]);

    if (isLoaded) {
        // convertDate();
    }

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

        function closeForm() {
            const modal = (document.getElementById('deadlineModal')!);
            modal.classList.remove('visible');
        }

    function sendForm(this: any) {
        const formData = document.querySelector('form')!;
        const name = formData.elements['name'].value;
        const deadline = formData.elements['deadline'].value;
        const link = formData.elements['link'].value;
        let members = [] as any;
        if (formData.elements['members[0][id]'].value !== "") {
            members0 = formData.elements['members[0][id]'].value;
            let memberObj0 = {id: members0};
            members.push(memberObj0);
        }
        if (formData.elements['members[1][id]'].value !== "") {
            members1 = formData.elements['members[1][id]'].value;
            let memberObj1 = {id: members1};
            members.push(memberObj1);
        }
        if (formData.elements['members[2][id]'].value !== "") {
            members2 = formData.elements['members[2][id]'].value;
            let memberObj2 = {id: members2};
            members.push(memberObj2);
        }

        axios.post('http://localhost:3001/deadlines', {
            name: name,
            deadline: deadline,
            link: link,
            members: members
        })
            .then(function (response) {
                console.log(response);
                closeForm();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

        return (
            <div id="deadlineModal" className={'animate__animated animate__bounce modal'}>
                <div className={'modal__top'}>
                    <h2>Deadline toevoegen</h2>
                    <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'} onClick={closeForm}/>
                </div>
                <form method="post" encType='application/json' action="http://192.168.2.14:3001/deadlines" id={'deadlineForm'} className={'deadlineForm'}>
                    <label className={'deadlineForm__label'}>Naam</label>
                    <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={'Naam...'}/>
                    <label className={'deadlineForm__label'}>Datum</label>
                    <input className={'deadlineForm__date'} type={'date'} name={'deadline'} placeholder={'Date'}/>
                    <label className={'deadlineForm__label'}>Link</label>
                    <input className={'deadlineForm__link'} type={'text'} name={'link'} placeholder={'Link...'}/>
                        <div className={'members'}>
                            {/*<div className={'members__section'}>*/}
                            {/*    <label className={'members__section--title'}>Member 1</label>*/}
                            {/*    {members.map((memberData, index) => (*/}
                            {/*    <div key={index}>*/}
                            {/*        <input className={'members__section--radio'} type={'radio'} name={'members[0][id]'} value={memberData.id} id={memberData.id}/>*/}
                            {/*        <label htmlFor={memberData.id}><span></span>{memberData.name}</label>*/}
                            {/*    </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            {/*<div className={'members__section'}>*/}
                            {/*    <label className={'members__section--title'}>Member 2</label>*/}
                            {/*    {members.map((memberData, index) => (*/}
                            {/*        <div key={index}>*/}
                            {/*            <input className={'members__section--radio'} type={'radio'} name={'members[1][id]'} value={memberData.id} id={memberData.id}/>*/}
                            {/*            <label htmlFor={memberData.id}><span></span>{memberData.name}</label>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            {/*<div className={'members__section'}>*/}
                            {/*    <label className={'members__section--title'}>Member 3</label>*/}
                            {/*    {members.map((memberData, index) => (*/}
                            {/*        <div key={index}>*/}
                            {/*            <input className={'members__section--radio'} type={'radio'} name={'members[2][id]'} value={memberData.id} id={memberData.id}/>*/}
                            {/*            <label htmlFor={memberData.id}><span></span>{memberData.name}</label>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <div className={'members__section'}>
                                <label className={'members__section--title'}>Member 1</label>
                                <select name={'members[0][id]'} className={'member__section--select'}>
                                    <option value={""}>Geen</option>
                                    {members.map((memberData, index) => (
                                        <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={'members__section'}>
                                <label className={'members__section--title'}>Member 2</label>
                                <select name={'members[1][id]'}>
                                    <option value={""}>Geen</option>
                                    {members.map((memberData, index) => (
                                        <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={'members__section'}>
                                <label className={'members__section--title'}>Member 3</label>
                                <select name={'members[2][id]'}>
                                    <option value={""}>Geen</option>
                                {members.map((memberData, index) => (
                                    <option key={index} value={memberData.id} id={memberData.id}>{memberData.name}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                </form>
            </div>
        )
}

export default Dialog_deadlines;