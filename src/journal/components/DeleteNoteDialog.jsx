import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton } from "@mui/material";
import { startDeletingNote } from "../../store/journal"; 
import { alpha } from '@mui/system';

export const DeleteNoteDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(startDeletingNote()); 
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>¿Eliminar nota?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar esta nota?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose} 
                    color="primary"
                    sx={(theme) => ({
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2), 
                            transform: 'scale(1.1)'
                        },
                        borderRadius: '10px',
                        padding: '1em',
                        marginRight: '1em',
                        marginBottom: '1em'
                    })}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={handleDelete} 
                    color="error" 
                    autoFocus
                    sx={(theme) => ({
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.error.main, 0.2), 
                            transform: 'scale(1.1)'
                        },
                        borderRadius: '10px',
                        padding: '1em',
                        marginRight: '2em',
                        marginBottom: '1em'
                    })}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
