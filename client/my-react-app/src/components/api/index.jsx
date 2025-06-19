import axios from "axios";

export const getPhones = async (page) => {
  const limit = 5;
  const url = `http://localhost:5000/api/phones/filters`;

  try {
    const { data } = await axios.get(url, {
      params: { limit, page },
    });

    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Server error: ${error.response.status}\n${error.response.data}`
      );
    } else {
      throw new Error(error.message);
    }
  }
};


export const createPhone = async (phoneData) => {
  try {
    console.log("Sending to backend:", phoneData);
    const response = await axios.post(
      "http://localhost:5000/api/phones",
      phoneData
    );
    return response.data;
  } catch (error) {
    console.error("Server error:", error.response?.data || error.message);
    throw new Error("Server error: " + (error.response?.status || "Unknown"));
  }
};

export const getBrands = async () =>{ 
  const url = `http://localhost:5000/api/phones/brands`;
  try {
    const { data } = await axios.get(url);

    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Server error: ${error.response.status}\n${error.response.data}`
      );
    } else {
      throw new Error(error.message);
    }
  }
};

export const deletePhone = async (id) =>{ 
  const url = `http://localhost:5000/api/phones/${id}`;

  try{ 
    const response = await axios.delete(url);
    console.log(response)
    return response
  }catch(error){ 
    console.error("Server error:", error.response?.data || error.message);
    throw new Error("Server error: " + (error.response?.status || "Unknown"));
  }
  }
 export const editPhone = async (id, phoneData) =>{ 
  const url = `http://localhost:5000/api/phones/${id}`;
  
  try { 
    const response = await axios.put(url, phoneData);
    console.log(response)
    return response
  }catch(error){ 
    console.error("Server error:", error.response?.data || error.message);
    throw new Error("Server error: " + (error.response?.status || "Unknown"));
 
  }
  }

// export const getPhones = async (page) => {
//   const limit = 5;

//   // OFFSET = LIMIT * сторінку_яку_ми_запитуємо - 1

// //   const offset = page > 1 ? limit * (page - 1) : 0;

//   const url = http://localhost:5000/api/phones/filters?limit=${limit}&page=${page};

//   const response = await fetch(url);

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(Server error: ${response.status}\n${text});
//   }
//   const data = await response.json();

//   console.log(data)

//   return data;
// };

// export const createUser = async (userData) => {
//   const url = "http://localhost:5001/api/users";

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   };

//   const response = await fetch(url, requestOptions);
//   const data = await response.json();

//   return data;
// };

// export const getGroups = async () => {
//   const url = "http://localhost:5001/api/groups";

//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// };