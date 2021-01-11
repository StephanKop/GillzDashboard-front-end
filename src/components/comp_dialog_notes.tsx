import React, {useEffect, useState} from 'react';
import '../component_styles/style_dialog_deadlines.scss';
import '../App.scss';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const DialogNotes = (props)  => {
    const [hasError, setErrors] =  useState(false);
    const [isLoaded, setIsLoaded] =  useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    async function fetchData() {
        const res = await fetch(props.apiLink);
        res
            .json()
            .then(() => {
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
        return <div className={'loading-container'}><img className={'loading'} src={require('../img/loading.gif')} alt={'loading'}/></div>;
    }

    if (hasError) {
        return <h2>Error</h2>;
    }

    function closeForm() {
        const modal = (document.getElementById('notesModal')!);
        modal.classList.remove('visibleAnim');
        const modalBackground = (document.getElementById('modalBackground')!);
        modalBackground.classList.remove('visible');
    }

    function sendForm(this: any) {
        const formData = document.querySelector('form')!;
        const title = formData.elements['title'.toString()].value;
        const description = formData.elements['description'.toString()].value;
        const date = formData.elements['date'.toString()].value;

        axios.post(process.env.REACT_APP_API_NOTES!!, {
            title: title,
            description: description,
            date: date
        })
            .then((response) => {
                console.log(response);
                closeForm();
                enqueueSnackbar('Notitie aangemaakt', {variant: 'success', anchorOrigin: {vertical: 'bottom', horizontal: 'center'}});
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('Dat ging niet helemaal goed', {variant: 'error', anchorOrigin: {vertical: 'bottom', horizontal: 'center'}});
            });

    }

    return (
        <>
            <div id="notesModal" className={'animate__animated animate__bounce modal'}>
                <div className={'modal__top'}>
                    <h2>Notitie toevoegen</h2>
                    <img id={'cancel'} className={'modal__top--img'} src={(require('../img/add.svg'))} alt={'add'}
                         onClick={closeForm}/>
                </div>
                <form method="post" encType="application/json" action="http://192.168.2.14:3001/deadlines"
                      id={'deadlineForm'} className={'deadlineForm'}>
                    <label className={'deadlineForm__label'}>Titel</label>
                    <input className={'deadlineForm__name'} type={'text'} name={'title'} placeholder={'Titel...'}/>
                    <label className={'deadlineForm__label'}>Beschrijving</label>
                    <textarea className={'deadlineForm__date'} name={'description'}
                           placeholder={'Beschrijving...'}/>
                    <label className={'deadlineForm__label'}>Datum</label>
                    <input className={'deadlineForm__date'} type={'date'} name={'date'} placeholder={'Date'}/>
                    <input type={'button'} onClick={sendForm} value={'Verzenden'} className={'submitButton'}/>
                </form>
            </div>
            <div className={'modal-background'} id={'modalBackground'}></div>
        </>
    );
};

export default DialogNotes;