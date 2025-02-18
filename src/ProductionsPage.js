import { useEffect, useState } from "react";
import { fetchItems } from "./fetchItems";
// import sampleProps from "./App"
import { useNavigate } from "react-router-dom";
// import { dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
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
import { sampleProductions } from "./testData";
const dayjs = require("dayjs");
const testing = true;

export default function ProductionsPage({}) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const [productions, setProductions] = useState(sampleProductions);
  useEffect(() => fetchItems("productions", setProductions), []);
  console.log(productions);

  return (
    <div sx={{ margin: "5%" }}>
      {/* toggle */}
      <Button variant="outlined" onClick={() => setAdding(!adding)}>
        {!adding ? "+ Add new production" : "- Close"}
      </Button>
      {adding && <ProductionForm />}
      <Divider></Divider>
      <Box centered sx={{ display: "flex", width: "100%", margin: "10%" }}>
        <ImageList cols={3}>
          {productions.map((prod) => (
            <Production
              key={prod.productionid}
              data={prod}
              navigate={navigate}
            />
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

function Production({ data, navigate }) {
  const {
    name: name,
    photopath: imgsrc,
    firstshowdate: firstShowDate,
    lastshowdate: lastShowDate,
    productionid: id,
    isarchived: isarchived,
  } = data;
  console.log(firstShowDate);
  return (
    <ImageListItem
      className={"production" + (isarchived === "true" && " archived")}
    >
      <img
        src={imgsrc}
        alt={name}
        onClick={() => navigate("/productions/" + id)}
      />
      <ImageListItemBar
        className="production"
        title={<Typography variant="h5">{name}</Typography>}
        subtitle={
          <>
            <span>
              Show dates: {firstShowDate.toDateString()} -{" "}
              {lastShowDate.toDateString()}
            </span>
          </>
        }
        position="below"
      />
    </ImageListItem>
  );
}

function ProductionForm() {
  const [formData, setFormData] = useState({
    firstShowDate: dayjs(),
    lastShowDate: dayjs(),
  });
  function handleChange(e) { // check im giving creds to this code
    console.log(e)
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
    console.log(formData);
  }
  function handleSubmit(e) {
    // not refactoring this yet becasuse iwant more control
    console.log(JSON.stringify(formData));
    async function submitData() {
      const res = await fetch(tryurl + "production", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      redirect("production/" + data.productionid);
    }
    submitData();
  }
  return (
    <Box centered display="inline-flex">

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <FormControl > */}
        <TextField
          name="title"
          label="Production Name"
          value={formData.title || ""}
          onChange={(e) => handleChange(e)}
          />
        <DatePicker
          label="First show date"
          value={formData.firstShowDate}
          onChange={(e) => setFormData({...formData, firstShowDate: e})}
          />
        {/* COULD IMPROVE BY VALIDATION that first < last */}
        <DatePicker
          name="lastShowDate"
          label="Last show date"
          value={formData.lastShowDate}
          onChange={(e) => setFormData({...formData, lastShowDate: e})}
          
          />
        <Button onClick={(e) => handleSubmit(e)} variant="contained">
          Submit
        </Button>
      {/* </FormControl> */}
    </LocalizationProvider>
          </Box>
  );
}
