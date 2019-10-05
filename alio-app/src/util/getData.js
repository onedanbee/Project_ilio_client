export const getData = async (value, callback) => {
  try {
    const data = await (await fetch(`http://127.0.0.1:8000/myapi/${value}`, {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })).json();

    callback(data);
  } catch (e) {
    console.log(e);
  }
};
