import {useState}  from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadToImgur from './ImgurAPI';


// https://mui.com/material-ui/react-button/
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUpload({setFile}) {
  // Given setFile, allows the user to upload a file.
    // URL for display on the webpage
    const [url, setUrl] = useState(null);
  return (
    <>
      <img src={url} style={{width:'400px'}} />
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type='file'
        accept="image/*"
        onChange={(event) => {setFile(event.target.files[0]); setUrl(URL.createObjectURL(event.target.files[0]))}}

        />
    </Button>
    </>
  );
}
