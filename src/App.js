import "./App.css";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
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
} from "@mui/material";


const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXR5eWhycWhjeG1ieHVsdXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMjEzNzMsImV4cCI6MjA1MjU5NzM3M30.Gd-9bO3KMEvcD-i5ug9Fr0SRvs_hkwvk1X-3yuoq4Vg"
const DBURL = `https://otutyyhrqhcxmbxuluvv.supabase.co/rest/v1/prop?apikey=${KEY}`;

function App() {

  return (
    <div className="App">
      <Box sx={{ display: 'flex'}}>

      <Sidebar w={100}/>
      <Main />
      
      </Box>

    </div>
  );
}

export default App;


function Main(){
  const [tags, setTags] = useState([]);

  return (
    <Box sx={{ flexGrow: 1, width:`calc(100%-${100}px)`, ml: `${100}px`}} component="main" >
        <TextField id="query" sx={{width: '500px'}} />
        <Button>Search!</Button>

        <Typography>HOPE YOU'RE HAVING A GREAT DAY</Typography>

        <FormControl>
          <Autocomplete
            sx={{width: 500}}
            multiple
            id="tags"
            options={tags} 
            // for create tag when not exist, use state for list of tags, on change 
            // add the tag to list of tags. (one concern is garbage)
            renderInput={(params) => (
              <TextField {...params} placeholder="Tags" />
            )}
            />
          <Divider />
        </FormControl>
        <Divider />
        
        <PropResults />
      </Box>
  )
}

function PropResults({  }){
  const tryurl = "http://localhost:5000"
  const [propResults, setPropResults] = useState([]);
  useEffect(function () {
    async function fetchProps() {
      const res = await fetch(tryurl);
      console.log(res.body)
      // if (error) HANDLE LATER
      const data = await res.json();
      setPropResults(data);
      console.log("got stuff")

    }
    fetchProps();
  }, [])
  return (
    <ImageList cols={3}>
      {propResults.map((propResult) => {
        <Prop data={propResult} />
      })}
    </ImageList>
  )
}

function Prop({data}){
  // handleSelectProp
  const {
    name: name,
    photopath: imgsrc,
    locationName: locname,
    locationID: loc,

    propID: id,
    status: status
  } = data;
  return <ImageListItem >
            <img onClick={handleSelectProp}
              src={imgsrc}
              alt={name}
            ></img>
            <ImageListItemBar
              title={name}
              subtitle={<>
              <span>Location: {loc}
                <br/> Status: {status}
              </span>
              </>
            }
              position="below"
            />
          </ImageListItem>
}

function Sidebar({w}) {
  return (
    <>
      <Drawer variant="permanent" anchor="left" sx={{width: w}}>
        Categories
        <Divider>
          <List>
            <SidebarItem />
          </List>
        </Divider>
      </Drawer>
    </>
  );
}

function SidebarItem() {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemText primary="Hello" />
      </ListItemButton>
    </ListItem>
  );
}

