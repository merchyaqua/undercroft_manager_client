const tryurl = "http://127.0.0.1:5000/";
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
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXR5eWhycWhjeG1ieHVsdXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjEzNzMsImV4cCI6MjA1MjU5NzM3M30.Gd-9bO3KMEvcD-i5ug9Fr0SRvs_hkwvk1X-3yuoq4Vg";
const DBURL = `https://otutyyhrqhcxmbxuluvv.supabase.co/rest/v1/prop?apikey=${KEY}`;
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
          <TextField
            id="query"
            sx={{ width: "500px" }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a prop"
          />
          {/* <Button>Search!</Button> */}

          <TagsInput tagsData={sampleTags} />
          <Divider />
          {/* As part of mental health week, I am noticing the ease of writing JSX that I normally take for granted. Imagine how the developers worked to parse complex nested syntax! */}
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

  function handleSelectProp() {
    navigate("prop/" + data.propid);
  }
  const {
    propname: name,
    photopath: imgsrc,
    locationname: locname,
    locationid: loc,
    isbroken: isbroken,
    propid: id,
    status: status,
  } = data;
  // console.log("here");
  return (
    <ImageListItem className={"prop" + (isbroken === "true" && " broken")}>
      <img onClick={handleSelectProp} src={imgsrc} alt={name}></img>
      <ImageListItemBar
        className="prop"
        title={<Typography variant="h5">{name}</Typography>}
        subtitle={
          <>
            <span>
              Location: {locname}
              <br /> Status: {isbroken ? "BROKEN" : "aVAIL"}
            </span>
          </>
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
