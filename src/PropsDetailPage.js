import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import sampleProps from "./App"
const tryurl = "http://127.0.0.1:5000/";

import {
  FormControl,
  InputLabel,
  Input,
  Checkbox,
  FormHelperText,
  Box,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  Autocomplete,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  FormGroup,
  FormControlLabel,
  ToggleButton,
} from "@mui/material";
import { fetchItems } from "./fetchItems";

const sampleProps = [
  {
    name: "test",
    photopath: `logo192.png`,
    locationname: "locname",
    locationid: "loc",
    isbroken: "false",
    propid: "id",
    status: "status",
    description: "testdesc",
  },
];
const sampleCategories = [
  {
    name: "testCategory",
    categoryid: 123,
  },
  {
    name: "testCategory2",
    categoryid: 124,
  },
];
export default function PropDetailsPage() {
  const [propItem, setPropItem] = useState(sampleProps[0]);
  const navigate = useNavigate();
  const {propID} = useParams();

  // Fetching data for this prop
  useEffect(() => fetchItems(tryurl + "prop/" + propID), []);
  console.log(propID);

  return (
    // could have the image left half and details right half be a two split flex items or something
    <
      // sx={{ flexGrow: 1, width: `calc(100%-${100}px)`, ml: `${100}px` }}
    >
      <div sx={{ display: "block", width: "100%", }}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{float:"left"}}>
          ⬅️Back
        </Button>
        <Button variant="outlined" sx={{float: "right"}}>⭐Star</Button>
      </div>
      <Box sx={{}}>
        {/* <Box sx={{ display: "inline-block", width: "800px" }}> */}
        <Box sx={{ display: "inline-block", width: "500px" }}>
          <img src={propItem.photopath} width={'90%'}/>
          <Button variant="contained" sx={{ width: "200px" }}>
            View use history
          </Button>
        </Box>
        {/* </Box> */}
        <Details propItem={propItem} />
      </Box>
    </>
  );
}

function Details({ propItem }) {
  return (
    <Box sx={{ display: "inline-block", width: "300px" }}>
      <p>
        <FormGroup>
          <TextField
            value={propItem.propname}
            contentEditable={true}
          ></TextField>
          <FormControlLabel
            required="true"
            control={<Checkbox color="warning" />}
            label="Broken"
          />
          {/* <ToggleButton value={false}> dafsa</ToggleButton> */}
          <TextField value={propItem.locationname}>Location: </TextField>
          <TextField value={propItem.description}></TextField>
        </FormGroup>
      </p>
      <span>
        {/* Dropdown menu */}
        <Button variant="outlined">Add prop to production</Button>
      </span>
    </Box>
  );
}
