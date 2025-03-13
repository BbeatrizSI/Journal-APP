import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery, DeleteNoteDialog } from '../components'
import { useForm } from '../../hooks/useForm'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useRef, useState } from 'react'
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { alpha } from '@mui/system';
import { useTheme } from '@mui/material/styles';


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note )

    const [openDialog, setOpenDialog] = useState(false);

    const theme = useTheme();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleDateString('es-ES', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState])

    useEffect(() => {
      if ( messageSaved.length > 0 ) {
        Swal.fire({
            title: 'Nota guardada',
            text: messageSaved,
            icon: 'success',
            confirmButtonColor: theme.palette.secondary.main 
        });
      }
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        setOpenDialog(true);
        // dispatch( startDeletingNote() );
    }
    

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        sx={{ 
            mb: 1 , 
            maxWidth: '1024px',
            ml: { xs: 0, md: '5%' },
            mr: { xs: 0, md: '5%' }
         }}
        className="animate__animated animate__fadeIn animate__faster"
    >
        <DeleteNoteDialog 
            open={ openDialog }
            setOpen={ setOpenDialog }
        />
        <Grid 
            item 
            sx={{
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems:'center',
                flexDirection: { xs: 'column', md: 'row' }
            }}
            mb={2}
        >
            <Typography fontSize={ '1.7em' } fontWeight='light'>{ dateString }</Typography>
            <Grid display={ 'flex' } sx={{ alignSelf: 'flex-end' }} >
                <input 
                    type="file" 
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                    sx={(theme) => ({
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2), 
                            transform: 'scale(1.1)'
                        }
                    })}
                >
                    <UploadOutlined sx={{ fontSize: '1.2em' }} />
                </IconButton>
            </Grid>
        </Grid>
      
        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingresa un título'
                label='Título'
                sx={{ border: 'none', mb: 1 }}
                name= "title"
                value={ title }
                onChange={ onInputChange }
            />
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Qué tienes que contar?'
                label='Cuerpo'
                minRows={ 5 }
                name= "body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end' mt={2}>
            <Button 
                disabled={ isSaving }
                onClick={ onSaveNote }
                color='primary' 
                sx={(theme) => ({
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2), 
                        transform: 'scale(1.1)'
                    },
                    borderRadius: '10px',
                    paddingRight: '1em',
                    marginRight: '1em'
                })}
            >
                <SaveOutlined sx={{ fontSize: '2em', mr: 1 }} />
                Guardar
            </Button>

            <Button
                onClick={ onDelete }
                color="error"
                sx={(theme) => ({
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.1), 
                        transform: 'scale(1.1)'
                    },
                    borderRadius: '10px',
                    paddingRight: '1em'
                })}
            >
                <DeleteOutline sx={{ fontSize: '2em', mr: 1 }} />
                Borrar
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls } />
    </Grid>
  )
}
