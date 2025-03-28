import { useEffect, useState } from "react";
import { fetchItems, handleFormSubmit } from "./fetchItems";
// import sampleProps from "./App"
import { useNavigate } from "react-router-dom";
// import { dayjs } from "dayjs";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sampleProductions } from "./testData";
const dayjs = require("dayjs");
const testing = true;

export default function ProductionsPage({}) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const [productions, setProductions] = useState([]);
  useEffect(() => fetchItems("production", setProductions), [adding]);
  // console.log(productions);

  return (
    <div sx={{ margin: "5%" }}>
      <Button variant="outlined" onClick={() => setAdding(!adding)}>
        {!adding ? "+ Add new production" : "- Close"}
      </Button>
      {adding && <ProductionForm setAdding={setAdding} />}
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
    title: name,
    photopath: imgsrc,
    firstshowdate: firstShowDate,
    lastshowdate: lastShowDate,
    productionid: id,
    isarchived: isarchived,
  } = data;
  // console.log(firstShowDate);
  return (
    <ImageListItem
      onClick={() => navigate("/production/" + id + "/props-lists")}
      className={"production" + (isarchived === "true" && " archived")}
    >
      <img src={imgsrc} alt={name} />
      <ImageListItemBar
        className="production"
        title={<Typography variant="h5">{name}</Typography>}
        subtitle={
          <>
            <span>
              Show dates: {dayjs(firstShowDate).format("DD/MM/YYYY")} -
              {dayjs(lastShowDate).format("DD/MM/YYYY")}
            </span>
          </>
        }
        position="below"
      />
    </ImageListItem>
  );
}

function ProductionForm({ setAdding }) {
  const [formData, setFormData] = useState({
    firstShowDate: dayjs(),
    lastShowDate: dayjs(),
    photoPath: "",
  });

  return (
    <Box centered display="inline-flex">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <FormControl > */}
        <TextField
          name="title"
          label="Production Name"
          value={formData.title || ""}
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <DatePicker
          label="First show date"
          value={formData.firstShowDate}
          onChange={(e) => setFormData({ ...formData, firstShowDate: e })}
        />
        {/* COULD IMPROVE BY VALIDATION that first < last */}
        <DatePicker
          name="lastShowDate"
          label="Last show date"
          value={formData.lastShowDate}
          onChange={(e) => setFormData({ ...formData, lastShowDate: e })}
        />
        {/* Ensure a correct format of dates is submitted */}
        <Button
          onClick={(e) => {
            handleFormSubmit(e, "production", {
              ...formData,
              firstShowDate: formData.firstShowDate.toISOString(),
              lastShowDate: formData.lastShowDate.toISOString(),
            })
            setAdding(false)
          }
            
          }
          variant="contained"
        >
          Submit
        </Button>
        {/* </FormControl> */}
      </LocalizationProvider>
    </Box>
  );
}
