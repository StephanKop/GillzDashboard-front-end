import React, { Component } from 'react';
import Notes from "../components/comp_notes";
import Notes_deadlines from "../components/comp_dialog_notes";
import '../page_styles/style_notes.scss';
import '../App.scss';

export class Page_Notes extends Component {
    render() {
        function openForm() {
            const modal = (document.getElementById('notesModal')!);
            const body = (document.querySelector('body')!);
            // body.classList.add('darken');
            modal.classList.add('visible');
        }
        return (
            <div className={'content'}>
                <div className={'content-container'}>
                    <div className={'notes-container__row'}>
                        <h3 className={'notes-container__row--title'}>Notes</h3>
                        <div className={'notes-container__row--add'}>
                            <img id={'add'} src={(require('../img/add.svg'))} alt={'add'} onClick={openForm}/>
                        </div>
                    </div>
                    <Notes apiLink={'http://localhost:3001/notes'}/>
                    <Notes_deadlines apiLink={'http://localhost:3001/members'}/>
                </div>
            </div>
        )
    }
}
