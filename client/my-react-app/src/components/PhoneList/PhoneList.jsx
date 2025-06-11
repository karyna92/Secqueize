import { useState, useEffect } from "react";
import { getPhones } from "../api/index";

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  

  const loadPhones = (pageNumber) => {
    getPhones(pageNumber)
      .then((data) => {
        setPhones(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadPhones(page)
  }, [page]);
  // Пустий масив залежностей - componentDidMount

  return <div>
    <h1>sdfghjk</h1>
  </div>
};

export default PhoneList;
