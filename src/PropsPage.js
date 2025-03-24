import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./Loader";
import { Sidebar } from "./Sidebar";
import { sampleProps, sampleTags } from "./testData";
import { tryurl } from "./fetchItems";
const testing = false;

export default function Main() {
  const [categoryID, setCategoryID] = useState("");
  const [propResults, setPropResults] = useState(sampleProps);
  const [query, setQuery] = useState("");
  const [tagsSelected, setTagsSelected] = useState([]);

  // States used for data fetching
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function fetchProps() {
        if (testing) return;
        try {
          setError(null);
          setLoading(true);
          const requestURL =
            tryurl +
            "/prop?" +
            new URLSearchParams({
              query: query,
              categoryID: categoryID,
              tags: tagsSelected,
            });

          const res = await fetch(requestURL);
          if (!res.ok) throw new Error("There was a problem fetching results.");

          const data = await res.json();
          if (data.length === 0) throw new Error("No results");
          setPropResults(data);
          // console.log(data);
          console.log("got stuff");
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchProps();
    },
    [categoryID, query, tagsSelected]
  );

  // console.log(propResults);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          ml: "20px",
          position: "absolute",
          height: "100%",
        }}
        component="main"
      >
        <Sidebar
          setCategoryID={setCategoryID}
          selectedCategoryID={categoryID}
        />
        <Box
          sx={{ flexGrow: 1, ml: `200px`, position: "relative" }}
          component="main"
        >
          {/* Search field */}
          <TextField
            id="query"
            sx={{ width: "500px" }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a prop"
          />

          <TagsInput tagsData={sampleTags} />
          <Divider />
          <Loader error={error} loading={loading}>
            <PropResults propResults={propResults} />
          </Loader>
        </Box>
      </Box>
    </>
  );
}

function PropResults({ propResults }) {
  return (
    <ImageList cols={3}>
      {propResults.map((propResult) => (
        <Prop key={propResult.propid} data={propResult} />
      ))}
    </ImageList>
  );
}
function Prop({ data }) {
  const navigate = useNavigate();
  // Clicking the list item links to the prop detail page
  function handleSelectProp() {
    navigate("prop/" + data.propid);
  }
  // Destructuring the prop data JSON object
  const {
    propname: name,
    photopath: imgsrc,
    locationname: locname,
    isbroken: isbroken,
  } = data;
  const available = data.available === 1;
  console.log(data.available)
  const statusText = isbroken ? "BROKEN" : (available? "Available" : "In use")
  const squareClass = isbroken ? "broken" : (!available && "in-use")
  // console.log("here");
  return (
    
    <ImageListItem className={"prop " + squareClass}>
      <img onClick={handleSelectProp} src={imgsrc} alt={name}></img>
      <ImageListItemBar
        className="prop"
        title={<Typography variant="h5">{name}</Typography>}
        subtitle={
          <span>
            {data.available}
            Location: {locname}
            <br /> Status: {statusText}
          </span>
        }
        position="below"
      />
    </ImageListItem>
  );
}

function TagsInput({ tagsData }) {
  const [selectedTagIDs, setSelectedTagIDs] = useState([]);

  return (
    <FormControl>
      <Autocomplete
        sx={{ width: 500 }}
        multiple
        id="tagsInput"
        options={tagsData}
        getOptionLabel={(tag) => tag.name}
        onChange={(e, newSelectedTag) => {
          setSelectedTagIDs([...selectedTagIDs, newSelectedTag.tagid]);
          console.log(selectedTagIDs);
        }}
        // uh oh, it basically can't keep track of IDs. check out multiselect example cod3e
        // for create tag when not exist, use state for list of tags, on change
        // add the tag to list of tags. (one concern is garbage)
        renderInput={(params) => <TextField {...params} placeholder="Tags" />}
      />
      <Divider />
    </FormControl>
  );
}

{
  /* As part of mental health week, I am noticing the ease of writing JSX that I normally take for granted. Imagine how the developers worked to parse complex nested syntax! */
}
