import { fileUpload } from "../../src/helpers";

describe('Pruebas en fileUpload', () => { 

    // test('debe subir el archivo correctamente a cloudinary', async() => { 
    //     const imageUrl = 'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/escalar-imagen-r.png';
    //     const resp = await fetch( imageUrl );
    //     const blob = await resp.blob();
    //     const file = new File( [blob], 'foto.png' );
        
    //     const url = await fileUpload( file );

    //     expect( typeof url ).toBe('string');

    //     //habría que añadir la parte de cloudinary para eliminar la imagen con la que se hace el test
    // })

    test('debe retornar null si no carga la imagen', async() => { 
        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );
        expect( url ).toBe(null);
    })

})