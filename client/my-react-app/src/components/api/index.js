export const getPhones = async (page) => {
  const limit = 5; // 5 юзерів на сторінці

  // OFFSET = LIMIT * сторінку_яку_ми_запитуємо - 1

//   const offset = page > 1 ? limit * (page - 1) : 0;



  const url = `http://localhost:5000/api/phones/filters?limit=${limit}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Server error: ${response.status}\n${text}`);
  }
  const data = await response.json();

  console.log(data)

  return data;
};
