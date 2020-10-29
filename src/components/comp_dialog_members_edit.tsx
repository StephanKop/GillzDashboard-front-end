import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_members.scss';
import '../App.scss';
import axios from 'axios';

const Dialog_member_edit = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)
    const [members,setMembers ]= useState<any[]>([])

    async function fetchMember() {
        const res = await fetch(props.memberLink);
        res
            .json()
            .then((res) => {
                setMembers(res);
                setTimeout(function() {
                    setIsLoaded(true);
                }, 100);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchMember();
        // fetchDeadline();
    }, [isLoaded]);

    if (isLoaded) {
        // console.log(deadline);
    }

    if (!isLoaded) {
        // return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')}/></div>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function closeForm() {
        const modal = (document.getElementById('memberEditModal')!);
        modal.classList.remove('visible');
    }

    function sendForm(this: any) {
        let formData = document.querySelector("#memberEditForm")! as HTMLFormElement;
        const name = formData.elements['name'].value;
        const profileURL = formData.elements['image'].value;
        const present = formData.elements['present'].value;
        let boolValue = getBoolean(present);
        function getBoolean(value){
            switch(value){
                case true:
                case "true":
                case 1:
                case "1":
                case "on":
                case "yes":
                    return true;
                default:
                    return false;
            }
        }

        axios.put(props.memberLink, {
            name: name,
            image: profileURL,
            present: boolValue,
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
        <div id="memberEditModal" className={'animate__animated animate__bounce modal'}>
            <div className={'modal__top'}>
                <h2>Member bewerken</h2>
                <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'} onClick={closeForm}/>
            </div>
            <form method="post" encType='application/json' id={'memberEditForm'} className={'deadlineForm'}>
                <label className={'deadlineForm__label'}>Naam</label>
                <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={props.name} defaultValue={props.name}/>
                <label className={'deadlineForm__label'}>Profielfoto URL</label>
                <input className={'deadlineForm__date'} type={'text'} name={'image'} placeholder={props.image} defaultValue={props.image}/>
                <label className={'deadlineForm__label'}>Aanwezig</label>
                <select name={'present'} className={'deadlineForm__select'}>
                    <option value={'false'}>Nee</option>
                    <option value={'true'}>Ja</option>
                </select>
                <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
            </form>
        </div>
    )
}

export default Dialog_member_edit;