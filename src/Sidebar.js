const tryurl = "http://127.0.0.1:5000";
import { useEffect, useState } from "react";
import {
  Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText} from "@mui/material"
import { fetchItems } from "./fetchItems";
export 
function Sidebar({ w, setCategoryID, selectedCategoryID }) {
  const [categories, setCategories] = useState([]);
  // TODO: fetch category data here
  useEffect(() => fetchItems(tryurl+"/category", setCategories), [])

  return (
    <>
      <Drawer variant="permanent" anchor="left"
       sx={{     '& .MuiDrawer-root': {
        position: 'absolute'
    },
    '& .MuiPaper-root': {
        position: 'absolute'
    }, width:{w}
  }}>
        Categories
        <Divider sx={{width: "50px"}}>
          <List>
          <SidebarItem
                setCategoryID={setCategoryID}
                selectedCategoryID={selectedCategoryID}
                categoryItem={{name: 'All', categoryid: ''}}
              />
            {categories.map((c) => (
              <SidebarItem 
                setCategoryID={setCategoryID}
                selectedCategoryID={selectedCategoryID}
                categoryItem={c}
              />
            ))}
          </List>
        </Divider>
      </Drawer>
    </>
  );
}

function SidebarItem({ categoryItem, selectedCategoryID, setCategoryID }) {
  function handleSelectCategory(categoryID) {
    if (categoryID !== selectedCategoryID)
      setCategoryID(categoryItem.categoryid);
  }
  return (
    <ListItem>
      <ListItemButton onClick={handleSelectCategory}>
        <ListItemText primary={categoryItem.name} />
      </ListItemButton>
    </ListItem>
  );
}
