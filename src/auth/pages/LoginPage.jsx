import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData )

  const isAuthenticated = useMemo( () => status === 'checking', [status] );
  
  const onSubmit = ( event ) => {
    event.preventDefault();
    
    dispatch( startLoginWithEmailPassword({ email, password }) );

  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Correo" 
                  type="email" 
                  placeholder="correo@email.com" 
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField 
                  label="Contraseña" 
                  type="password" 
                  placeholder="Contraseña" 
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                />
              </Grid>

              <Grid 
                container
                display={ !!errorMessage ? '' : 'none' }
                sx={{ mt:1 }}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Alert severuty="error">{ errorMessage }</Alert>
                </Grid>
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                      disabled={ isAuthenticated }
                      type="submit" 
                      variant='contained' 
                      fullWidth
                      sx={{ pt: 1.5 , pb: 1 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <Button 
                      disabled={ isAuthenticated }
                      variant='contained' 
                      fullWidth
                      onClick={ onGoogleSignIn }
                      sx={{ pt: 1.5 , pb: 1 }}
                  >  
                    <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
        </form>
    </AuthLayout>
  )
}
