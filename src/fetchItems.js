const tryurl = "http://127.0.0.1:5000/";

export function fetchItems(resource, setState){
  // A general function to fetch data from servers and setting a state to the data.
  async function fetchItemData() {
    try{

      const res = await fetch(tryurl+resource);
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchItemData();
}
