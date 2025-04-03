import { collection, setDoc, doc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async(  dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active } = getState().journal;

        // Evita crear otra si ya hay una activa vacía
        if (active && !active.title && !active.body && active.imageUrls.length === 0) {
            console.log("Ya hay una nota nueva activa, no creamos otra");
            return;
         }

        dispatch( savingNewNote());
        
        
        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        const setDocResp = await setDoc( newDoc, newNote );

        newNote.id = newDoc.id
        
        dispatch( addNewEmptyNote( newNote) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );   
        dispatch( setNotes( notes ) ); 
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;    

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );        
        await setDoc( docRef, noteToFirestore, { merge: true }); // merge: true -> actualiza la data de la nota y no la reemplaza
        
        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );
        
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );   
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );
        
    }
}