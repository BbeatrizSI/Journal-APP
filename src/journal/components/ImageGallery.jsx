import { ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';

export const ImageGallery = ({ images }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ImageList sx={{ width: '100%' , height: '100%' }} cols={isMdUp ? 4 : 2} rowHeight={200}>
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

