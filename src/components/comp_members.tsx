import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_members.scss';
import '../App.scss';
import MembersInterface from '../interfaces/members';
import DialogMembers from './comp_dialog_members';
import Dialog_member_edit from './comp_dialog_members_edit';

const Members = (props)  => {
    const  [hasError, setErrors] =  useState(false);
    const  [isLoaded, setIsLoaded] =  useState(false);
    const  [memberIsLoaded, setMemberIsLoaded] =  useState(false);
    const  [members,setMembers ]= useState<MembersInterface[]>([]);
    const [count, setCount] = useState(0);
    const  [member,setMember ] = useState<MembersInterface[]>([{
        id: 0,
        name: '',
        image: '',
        present: true,
        description: '',
        jobTitle: ''
    }]);
    const [editLink] = useState<any[]>([{
        link: 'http://localhost:3001/members/3'
    }]);

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((result) => {
                setIsLoaded(true);
                setMembers(result);
            })
            .catch(err => setErrors(err));
    }

    async function fetchMember() {
        const res = await fetch(editLink[0].link);
        res
            .json()
            .then((result) => {
                setMember(result);
                openEditForm();
                setTimeout(() => {
                    setMemberIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
        return true;
    }

    useEffect(() => {
        fetchData();
    }, [isLoaded, count]);

    const reload = () => {
        setCount(count +1 );
    };

    if (!isLoaded) {
        return <h2>Loading...</h2>;
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

    const present = (status) => {
        switch(status) {
            case true:
                return '1';
                break;
            case false:
                return '0.2';
                break;
        }
    };

    function openEditForm() {
        const modal = (document.getElementById('memberEditModal')!);
        modal.classList.add('visibleAnim');
        const modalBackground = (document.getElementById('modalBackground')!);
        modalBackground.classList.add('visible');
    }

    function setApiId(id) {
        const memberId = id;
        editLink[0].link = process.env.REACT_APP_API_MEMBERS+ '/' + memberId;
        fetchMember();
    }

    return (
        <div className={'members-container'}>
            {members.map((memberData, index) => (
                <div key={index} style={{opacity: present(memberData.present)}}>
                    <div className={'member'} id={'present' + memberData.present.toString()}>
                        <img className={'member__image'} src={memberData.image}/>
                        <h3 className={'member__name'}>{memberData.name}</h3>
                        <p className={'member__jobTitle'}>{memberData.jobTitle}</p>
                        <p className={'member__description'}>{memberData.description}</p>
                        <div className={'member__bottom-section'}>
                            <p className={'member__bottom-section__present'}>Aanwezig: {memberData.present.toString()}</p>
                            <img id={'edit'} src={(require('../img/edit.svg'))} alt={'edit'} onClick={() => setApiId(memberData.id)}/>
                        </div>
                    </div>
                </div>
            ))}
            <DialogMembers apiLink={process.env.REACT_APP_API_MEMBERS} reload={reload}/>
            <Dialog_member_edit
                memberLink={editLink[0].link}
                id={member[0].id}
                name={member[0].name}
                image={member[0].image}
                function={member[0].jobTitle}
                description={member[0].description}
                reload={reload}
            />
        </div>
    );
};

export default Members;
