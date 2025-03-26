import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { alpha } from '@mui/system';


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );
  
  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>

      {
        ( !!active ) 
          ? <NoteView />
          : <NothingSelectedView />
      }
      

      <IconButton
        onClick={ onClickNewNote }
        size='large'
        disabled={ isSaving }
        sx={(theme) => ({
          color: theme.palette.white.main,
          backgroundColor: 'secondary.main',
          transition: 'all 0.3s ease-in-out',
          position: 'fixed',
          right: {xs: 'auto', sm: '2em'},
          left: {xs: '50%', sm: 'auto'},
          bottom: { xs: '2.8em', sm: '2em'},
          transform: 'translateX(-50%)',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
          '&:hover': {
                color: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.main, 0.3), 
                transform: 'scale(1.1)'
          },
        })}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>
  )
}
