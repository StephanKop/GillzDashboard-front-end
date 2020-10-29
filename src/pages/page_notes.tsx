import React, { Component } from 'react';
import Notes from "../components/comp_notes";
import DialogNotes from "../components/comp_dialog_notes";
import '../page_styles/style_notes.scss';
import '../App.scss';

export class PageNotes extends Component {
    render() {
        function openForm() {
            const modal = (document.getElementById('notesModal')!);
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
                    <DialogNotes apiLink={'http://localhost:3001/members'}/>
                </div>
            </div>
        )
    }
}
