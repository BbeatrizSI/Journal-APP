import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: '100%' , height: 'auto' }} cols={4} rowHeight={200}>
      { images?.map((image, i) => (
        <ImageListItem key={i}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

