import { useState, useEffect } from "react";
import { getPhones , getBrands} from "../api/index";
import PhoneCard from "./PhoneCard";
import AddPhoneModal from "./AddPhoneModal";
import PhoneCardModal from "./PhoneCardModal";
import  "./styles.css";

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isModalAddPhoneOpen, setIsModalAddPhoneOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);


  const loadPhones = (pageNumber) => {
    getPhones(pageNumber)
      .then((data) => {
        setPhones(data.phones);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadBrands = () => {
    getBrands()
      .then(setBrands)
      .catch((error) => console.error("Brands loading error", error));
  };
  const phonesWithBrandNames = phones.map((phone) => {
    const brand = brands.find((b) => b.id === phone.brandId);
    return { ...phone, brandName: brand ? brand.name : "Unknown" };
  });
  
  const renderPhones = () => {
    return phonesWithBrandNames.map((phone) => (
      <PhoneCard
        phone={phone}
        key={phone.id}
        onClick={() => {
          setSelectedPhone(phone);
          setIsPhoneModalOpen(true);
        }}
      />
    ));
  };


  useEffect(() => {
    loadPhones(page)
    loadBrands();
  }, [page]);
  // Пустий масив залежностей - componentDidMount

  return (
    <div>
      <h1>Phone list</h1>
      <button onClick={() => setIsModalAddPhoneOpen(true)}>Add phone</button>
      {isLoading && <h2 className="loading">Loading....</h2>}
      {error && <h2 className="error">{error}</h2>}
      <section className="card-container">
        {phones.length > 0 ? (
          renderPhones()
        ) : (
          <h2 className="error">Phones not found</h2>
        )}
      </section>

      {/* modal window */}
      <AddPhoneModal
        isModalAddPhoneOpen={isModalAddPhoneOpen}
        setIsModalAddPhoneOpen={setIsModalAddPhoneOpen}
        brands={brands}
      />
      <PhoneCardModal
        isPhoneModalOpen={isPhoneModalOpen}
        setIsPhoneModalOpen={setIsPhoneModalOpen}
        selectedPhone={selectedPhone}
        setSelectedPhone={setSelectedPhone}
        brands={brands}
      />
    </div>
  );
};

export default PhoneList;
