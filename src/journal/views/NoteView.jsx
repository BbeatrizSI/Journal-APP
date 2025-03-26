import { DeleteOutline, SaveOutlined, UploadOutlined, PsychologyAlt, CloseOutlined  } from '@mui/icons-material'
import { CircularProgress } from '@mui/material';
import { Button, Grid, IconButton, TextField, Typography, Box } from '@mui/material'
import { ImageGallery, DeleteNoteDialog } from '../components'
import { useForm } from '../../hooks/useForm'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { setActiveNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { alpha } from '@mui/system';
import { useMediaQuery, useTheme } from '@mui/material';
import { addSentiment } from "../../store/sentiments";
import { analyzeSentiment } from "../../helpers";


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, date, onInputChange, formState } = useForm( note )

    const [openDialog, setOpenDialog] = useState(false);
    const [analysis, setAnalysis] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        setAnalysis({}); // Resetea el análisis al cambiar de nota
    }, [note]);

    const theme = useTheme();

    const isMdOrLarger = useMediaQuery(theme.breakpoints.up('md'));

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
    }

    // Función para analizar el sentimiento de la nota
    const handleAnalyze = useCallback(async () => {
        if (!body.trim()) return; // Evita llamadas innecesarias con un texto vacío
        setIsAnalyzing(true);
    
        const response = await analyzeSentiment(body);
        const resultText =response?.candidates[0]?.content?.parts[0]?.text;
        
        const result = resultText.replace(/^```json\s*/, "").replace(/```/g, "");
    
        try {
            const resultJSON = JSON.parse(result);
              
            const sentimentLabel = resultJSON.etiqueta;
            dispatch(addSentiment(sentimentLabel));
    
            // ✅ Guardamos como OBJETO, no como string
            setAnalysis(resultJSON);
        } catch (error) {
            console.error("Error al parsear el JSON:", error);
        } finally {
            setIsAnalyzing(false);
        }
    }, [body]);
    
  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        sx={{ 
            mb: 5 , 
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

        <Grid container justifyContent='space-between' mt={2}>
        <Button
            disabled={isSaving || isAnalyzing}
            onClick={handleAnalyze}
            variant="outlined"
            color="secondary"
            sx={{
                transition: 'all 0.2s ease-in-out',
                borderRadius: '10px',
                paddingX: { xs: 0, md: '1em' },
                marginRight: { xs: 0, md: '1em' },
                '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                    transform: 'scale(1.1)',
                },
                marging: '0px'
            }}
        >
            {isAnalyzing ? (
                <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{ mr: isMdOrLarger ? 1 : 0 }}
                />
                ) : (
                <PsychologyAlt sx={{ fontSize: '2em' }} />
                )
            }
            {isAnalyzing ? isMdOrLarger ? 'Analizando...' : '' : isMdOrLarger ? 'Analizar' : ''}
        </Button>
            <Box>
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
                        marginRight: { xs: 0, md: '1em' }
                    })}
                >
                    <SaveOutlined sx={{ fontSize: '2em', mr: { xs: 0.5, md: 1 } }} />
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
                    <DeleteOutline sx={{ fontSize: '2em', mr: { xs: 0.5, md: 1 } }} />
                    Borrar
                </Button>
            </Box>
        </Grid>
        { !!analysis?.etiqueta && (
            <Box
                sx={{
                    position: "relative", // Necesario para que ::after se posicione correctamente
                    mt: 3,
                    mb: 5,
                    border: `2px solid #C4577D`,
                    backgroundColor: "#f0f0f0",
                    padding: 2,
                    borderRadius: "16px",
                    maxWidth: { xs: "100%", md: "600px" }, 
                    zIndex: 100,
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "-15px", 
                        left: { xs: "17px", md: "6px" },
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        borderWidth: "0 15px 15px 15px", 
                        borderColor: `transparent transparent #C4577D transparent`,
                    },
                }}
            >
                <IconButton 
                    onClick={() => setAnalysis({})} 
                    sx={{
                        position: "absolute",
                        top: 2,  
                        right: 5, 
                        color: "#C4577D",
                        "&:hover": {
                            backgroundColor: "rgba(196, 87, 125, 0.2)"
                        }
                    }}
                >
                    <CloseOutlined />
                </IconButton>
                <Grid container mb={2}>
                    <Grid item xs={12} mb={1}>
                        <Typography variant="subtitle2">Análisis:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" mb={2} sx={{ textAlign: "justify", textIndent: "1.5em"}}>{analysis.explicacion}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" mb={1}>Recuerda:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" sx={{ textAlign: "justify", textIndent: "1.5em" }}>{analysis.frase}</Typography>
                    </Grid>
                </Grid>
            </Box>
        )}

        <ImageGallery images={ note.imageUrls } />
    </Grid>
  )
}
