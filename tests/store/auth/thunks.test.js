import { checkingAuthentication } from "../../src/store/auth/thunks";

describe('Pruebas en authThunks', () => { 
    test('debe de realizar la autenticación', () => { 
        checkingAuthentication();
    })
})