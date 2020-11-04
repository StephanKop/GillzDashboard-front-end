import React, { useState, useEffect } from 'react';
import '../component_styles/style_comp_members.scss';
import '../App.scss';
import DialogMembers from "./comp_dialog_members";
import Dialog_member_edit from "./comp_dialog_members_edit";

const Members = (props)  => {
    const  [hasError, setErrors] =  useState(false)
    const  [isLoaded, setIsLoaded] =  useState(false)
    const  [memberIsLoaded, setMemberIsLoaded] =  useState(false)
    const  [members,setMembers ]= useState<any[]>([])
    const  [member,setMember ] = useState<any[]>([{
        id: 0,
        name: "",
        image: "",
        present: true,
    }])
    let [editLink] = useState<any[]>([{
        link: "http://localhost:3001/members/3"
    }]);

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
                setMembers(res);
            })
            .catch(err => setErrors(err));
    }

    async function fetchMember() {
        const res = await fetch(editLink[0].link);
        res
            .json()
            .then((res) => {
                setMember(res);
                setTimeout(function() {
                    setMemberIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
        return true;
    }

    useEffect(() => {
        fetchData();
    }, [isLoaded]);

    if (isLoaded) {
        present();
    }

    if(memberIsLoaded) {
        openEditForm();
    }

    if (!isLoaded) {
        return <h2>Loading...</h2>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function present () {
        let absent = document.querySelectorAll('#presentfalse');
        absent.forEach((div) => {
            div.classList.add('red');
        });
    }

    function openEditForm() {
        const modal = (document.getElementById('memberEditModal')!);
        modal.classList.add('visibleAnim');
        const modalBackground = (document.getElementById('modalBackground')!);
        modalBackground.classList.add('visible');
    }

    function setApiId(id) {
        const memberId = id;
        editLink[0].link = process.env.REACT_APP_API_MEMBERS+ "/" + memberId;
        fetchMember();
    }

    return (
        <div className={'members-container'}>
            {members.map((memberData, index) => (
                <div key={index}>
                    <div className={'member'} id={'present' + memberData.present.toString()}>
                        <img className={'member__image'} src={memberData.image}/>
                        <h3 className={'member__name'}>{memberData.name}</h3>
                        <div className={'member__bottom-section'}>
                            <p className={'member__bottom-section__present'}>Aanwezig: {memberData.present.toString()}</p>
                            <img id={'edit'} src={(require('../img/edit.svg'))} alt={'edit'} onClick={() => setApiId(memberData.id)}/>
                        </div>
                    </div>
                </div>
            ))}
            <DialogMembers apiLink={process.env.REACT_APP_API_MEMBERS}/>
            <Dialog_member_edit
                memberLink={editLink[0].link}
                id={member[0].id}
                name={member[0].name}
                image={member[0].image}
            />
        </div>
    )
}

export default Members;
