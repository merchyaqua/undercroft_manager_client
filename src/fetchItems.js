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
    } finally {
    }
  }
  fetchItemData();
}

// Temporary wrapper function that simply submits the data
export function handleFormSubmit(e, resource, formData) {
  console.log(JSON.stringify(formData));
  return submitData(e, resource, formData);
}


// The async function that will return something and you can do whatever with it
export async function submitData(e, resource, formData) {
  const res = await fetch(tryurl + resource, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
}
