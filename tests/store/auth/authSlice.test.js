import { authSlice, login, logout, errorMessage, checkingCredentials } from "../../../src/store/auth/authSlice";
import { demoUser, initialState, authenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 
    test('debe de retornar el estado por defecto y llamarse auth', () => { 
        const state = authSlice.reducer( initialState, {} );

        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');
    })

    test('Debe realizar la autenticación', () => {
        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    })

    test('Debe realizar el logout sin argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    })

    test('Debe realizar el logout con argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    })

    test('Debe cambiar estado a checking', () => {
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking')
    })
})