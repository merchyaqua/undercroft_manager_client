const tryurl = "http://127.0.0.1:5000";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchItems } from "./fetchItems";
import { sampleCategories } from "./testData";
export function Sidebar({ w, setCategoryID, selectedCategoryID }) {
  const [categories, setCategories] = useState(sampleCategories);
  // Fetch category data here
  useEffect(() => fetchItems("category", setCategories), []);

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            // width: drawerWidth,
            boxSizing: "border-box",
          },
          "& .MuiDrawer-root": {
            position: "absolute",
          },
          "& .MuiPaper-root": {
            position: "absolute",
          },
          // height: "100%",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5">Categories</Typography>
        <Divider />
        <List
          sx={{
            maxWidth: "100px",
          }}
        >
          <SidebarItem
            setCategoryID={setCategoryID}
            selectedCategoryID={selectedCategoryID}
            categoryItem={{ name: "All", categoryid: "" }}
          />
          {categories.map((c) => (
            <>
              <Divider />
              <SidebarItem
                setCategoryID={setCategoryID}
                selectedCategoryID={selectedCategoryID}
                categoryItem={c}
              />
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
}

function SidebarItem({ categoryItem, selectedCategoryID, setCategoryID }) {
  function handleSelectCategory(categoryID) {
    // If this category is not already selected, make a change
    const selectedThis = categoryItem.categoryid === selectedCategoryID;
    if (!selectedThis) setCategoryID(categoryItem.categoryid);
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleSelectCategory}>
        <ListItemText primary={categoryItem.name} size={"small"} />
      </ListItemButton>
    </ListItem>
  );
}
