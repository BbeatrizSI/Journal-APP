import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import DescriptionIcon from '@mui/icons-material/Description';
import { useMemo } from "react"
import { setActiveNote } from "../../store/journal"
import { useDispatch } from "react-redux"
import { closeSidebar } from "../../store/sidebar";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        const formattedDate = newDate.toLocaleDateString('es-ES', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    
        const formattedTime = newDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    
        return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}, ${formattedTime}`;
    }, [date]);

    const onClickNote = () => {
        dispatch( setActiveNote({ id, title, body, date, imageUrls }) );
        setTimeout(() => {
            dispatch( closeSidebar() );
        }, 300)
    }

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title;
    }, [ title ]);

    const newBody = useMemo( () => {
        return body.length > 100
            ? body.substring( 0, 100 ) + '...'
            : body;
    }, [ body ]);

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <DescriptionIcon color={'secondary'}/>
            </ListItemIcon>
            <Grid container>
                <ListItemText 
                    primary={ 
                        <>
                            { newTitle }
                            <Typography variant="caption" color="gray" display="block">
                                { dateString }
                            </Typography>
                        </>
                    } 
                />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
