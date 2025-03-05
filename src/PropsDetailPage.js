import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsForm } from "./PropsAddPage";
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
    photopath: "http://localhost:3000/logo192.png",
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
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { propID } = useParams();
  function handleSaveDetails() {}
  // Fetching data for this prop
  useEffect(() => fetchItems("prop/" + propID, setPropItem), []);
  console.log(propID);

  return (
    // could have the image left half and details right half be a two split flex items or something
    <
      // sx={{ flexGrow: 1, width: `calc(100%-${100}px)`, ml: `${100}px` }}
    >
      <div sx={{ display: "block", width: "100%" }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ float: "left" }}
        >
          ⬅️Back
        </Button>
        <Button variant="outlined" sx={{ float: "right" }}>
          ⭐Star
        </Button>
      </div>
      <Box sx={{display:"grid"}}>
        <Box >
          <Box sx={{ display: "inline-block", width: "50%" }}>
            <img src={propItem.photopath} sx={{  maxWidth: "100%"  }} />
            <Button variant="contained" sx={{ width: "100%" }}>
              View use history
            </Button>
          </Box>
        {editing ? (
          <>
            <Button
              variant="outlined"
              color="warning"
              sx={{ width: "1px" }}
              onClick={() => setEditing(false)}
            >
              ❌
            </Button>
            <Button
              variant="contained"
              sx={{ width: "10px" }}
              onClick={handleSaveDetails}
              >
              Save
            </Button>
            <EditDetailsForm defaultFormData={propItem} />
          </>
        ) : (
          <>
            <Details propItem={propItem} />

            <Button
              variant="contained"
              sx={{ width: "10px" }}
              onClick={() => setEditing(true)}
              >
              Edit
            </Button>
          </>
        )}
        </Box>
      </Box>
    </>
  );
}

function Details({ propItem }) {
  return (
    <Box sx={{ display: "inline-block", width: "300px" }}>
      <p>
        <FormGroup>
          <TextField value={propItem.propname}></TextField>
          {propItem.isbroken ? "hi" : "bye"}
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

function EditDetailsForm({ defaultFormData }) {
  const data = {
    name: defaultFormData.name,
    photoPath: defaultFormData.photopath,
    locationName: defaultFormData.locationname,
    locationID: defaultFormData.locationid,
    isBroken: defaultFormData.isbroken,
    propID: defaultFormData.propID,
    status: defaultFormData.status,
    description: defaultFormData.description,
  };
  // Since we are reusing existing data returned (meaning it has no capitalisation),
  // we must do manual mapping before giving to form, which records details with capitalisation.
  // It also need to request to the update route instead of the POST route.
  // And the default selected.
  return <DetailsForm defaultFormData={data} />;
}
