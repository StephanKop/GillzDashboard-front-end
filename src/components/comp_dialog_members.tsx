import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_members.scss';
import '../App.scss';
import axios from 'axios';

const DialogMembers = (props)  => {
    const [hasError, setErrors] =  useState(false)
    const [isLoaded, setIsLoaded] =  useState(false)

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then((res) => {
                setIsLoaded(true);
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        // let interval = setInterval(() => fetchData(), (1000))
        // return () => clearInterval(interval)
    });

    if (isLoaded) {
        // convertDate();
    }

    if (!isLoaded) {
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')} alt={'loading'}/></div>
    }

    if (hasError) {
        return <h2>Error</h2>
    }

    function closeForm() {
        const modal = (document.getElementById('membersModal')!);
        modal.classList.remove('visible');
    }

    function sendForm(this: any) {
        const formData = document.querySelector('form')!;
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

        axios.post('http://localhost:3001/members', {
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
        <div id="membersModal" className={'animate__animated animate__bounce modal'}>
            <div className={'modal__top'}>
                <h2>Member toevoegen</h2>
                <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'} onClick={closeForm}/>
            </div>
            <form method="post" encType='application/json' id={'deadlineForm'} className={'deadlineForm'}>
                <label className={'deadlineForm__label'}>Naam</label>
                <input className={'deadlineForm__name'} type={'text'} name={'name'} placeholder={'Naam...'}/>
                <label className={'deadlineForm__label'}>Profielfoto URL</label>
                <input className={'deadlineForm__date'} type={'text'} name={'image'} placeholder={'URL...'}/>
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

export default DialogMembers;