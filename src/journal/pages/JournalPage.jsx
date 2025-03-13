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
          '&:hover': {
                color: theme.palette.secondary.main,
                backgroundColor: alpha(theme.palette.secondary.main, 0.3), 
                transform: 'scale(1.1)'
          },
          position: 'fixed',
          right: { xs: '1.5em', sm: '2em'},
          bottom: { xs: '1.5em', sm: '2em'}
        })}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>
  )
}
