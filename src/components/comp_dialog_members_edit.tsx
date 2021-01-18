import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_members.scss';
import '../App.scss';
import MembersInterface from '../interfaces/members';
import axios from 'axios';

const DialogMemberEdit = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [members,setMembers ]= useState<MembersInterface[]>([]);

    async function fetchMember() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((result) => {
                setMembers(result);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchMember();
    }, [isLoaded]);

    if (hasError) {
        return <h2>{hasError}</h2>;
    }

    const closeForm = () => {
        console.log('close');
        const modal = (document.getElementById('memberEditModal')!);
        modal.classList.remove('visibleAnim');
        const modalBackground = (document.getElementById('modalBackground')!);
        modalBackground.classList.remove('visible');
    };

    function sendForm(this: any) {
        const formData = document.querySelector('#memberEditForm')! as HTMLFormElement;
        const name = formData.elements['name'.toString()].value;
        const profileURL = formData.elements['image'.toString()].value;
        const present = formData.elements['present'.toString()].value;
        const func = formData.elements['function'.toString()].value;
        const description = formData.elements['description'.toString()].value;
        const boolValue = getBoolean(present);
        function getBoolean(value){
            switch(value){
                case true:
                case 'true':
                case 1:
                case '1':
                case 'on':
                case 'yes':
                    return true;
                default:
                    return false;
            }
        }

        axios.put(props.memberLink, {
            name: name,
            image: profileURL,
            present: boolValue,
            jobTitle: func,
            description: description
        })
            .then((response) => {
                console.log(response);
                closeForm();
                props.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteRequest() {
        axios.delete(props.memberLink)
            .then((response) => {
                console.log(response);
                closeForm();
                props.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div id="memberEditModal" className={'animate__animated animate__bounce modal'}>
            <div className={'modal__top'}>
                <h2>Member bewerken</h2>
                <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'} onClick={closeForm}/>
            </div>
            <form method="post" encType="application/json" id={'memberEditForm'} className={'deadlineForm'}>
                <label className={'deadlineForm__label'}>Naam</label>
                <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={props.name} defaultValue={props.name}/>
                <label className={'deadlineForm__label'}>Functie</label>
                <input className={'deadlineForm__name'} type={'text'} name={'function'} placeholder={props.function} defaultValue={props.function}/>
                <label className={'deadlineForm__label'}>Beschrijving</label>
                <textarea className={'deadlineForm__name'} name={'description'} placeholder={props.description} defaultValue={props.description}/>
                <label className={'deadlineForm__label'}>Profielfoto URL</label>
                <input className={'deadlineForm__date'} type={'text'} name={'image'} placeholder={props.image} defaultValue={props.image}/>
                <label className={'deadlineForm__label'}>Aanwezig</label>
                <select name={'present'} className={'deadlineForm__select'}>
                    <option value={'true'}>Ja</option>
                    <option value={'false'}>Nee</option>
                </select>
                <div className={'deadlineForm__buttons'}>
                    <input type={'button'} onClick={deleteRequest} value={'Verwijderen'} className={'deleteButton'}/>
                    <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                </div>
            </form>
        </div>
    );
};

export default DialogMemberEdit;