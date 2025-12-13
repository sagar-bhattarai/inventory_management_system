import React, { useState } from "react";
import axios from "axios";
import constant from "../constant.js";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useEffect } from "react";

function Suppliers() {
  const [addEditModal, setAddEditModal] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [editSupplier, setEditSupplier] = useState(false);
  const url = `${constant.PATH}/suppliers`;

const getAllCategories = async () =>{
    const response = await axios.get( `${url}/all`, constant.HEADERS);
    setEditSupplier(response);
    console.log("response", response)
} 

  useEffect(()=>{
    getAllCategories();
  },[])

  const handleChangeOnModal = (e) => {
    // console.log(e.target);  //  <input placeholder="Enter supplier Email" required="" type="email" value="admin@gmail.com" name="email">
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // name="email" , name="phone" etc..
    }));
  };

  const hideModal = () => {
    setTimeout(() => {
      setAddEditModal(null);
      setInfo("");
      setErrorMsg(false);
      setFormData({
        [formData.name]: "",
        [formData.email]: "",
        [formData.phone]: "",
        [formData.address]: "",
      });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfo("");
    setErrorMsg(false);
    try {
      let response = null;
      if (editSupplier) {
        // response = await axios.put(
        //     `${url}/update/${editCategory}`,
        //     { categoryName, categoryDescription },
        //      constant.HEADERS
        // );
      } else {
        response = await axios.post(`${url}/add`, formData, constant.HEADERS);
      }
      if (response) {
        setInfo(`${formData.name} ${response.data.message}`);
        hideModal();
        // fetchAllSuppliers();
      }
    } catch (error) {
      if (error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.response.statusText);
      }
      hideModal();
    } finally {
      setLoading(false);
    }
  };

  const modalContainer = () => {
    return (
      <div className="add_edit_modal">
        <div className="modal_wrapper">
          <div className="top_container">
            <h1>Add Supplier</h1>
            <button
              className="cancel_button"
              onClick={() => setAddEditModal(null)}
            >
              X
            </button>
          </div>
          {!errorMsg && !info ? (
            <form className="suppliers_form" onSubmit={handleSubmit}>
              <div className="input_container">
                <label>Supplier Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter supplier Name"
                  required
                  value={formData.name}
                  onChange={handleChangeOnModal}
                />
              </div>
              <div className="input_container">
                <label>Supplier Name</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter supplier Email"
                  required
                  value={formData.email}
                  onChange={handleChangeOnModal}
                />
              </div>
              <div className="input_container">
                <label>Supplier Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter supplier Phone"
                  required
                  value={formData.phone}
                  onChange={handleChangeOnModal}
                />
              </div>
              <div className="input_container">
                <label>Supplier Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="supplier Address"
                  required
                  value={formData.address}
                  onChange={handleChangeOnModal}
                />
              </div>
              <button className="add_button">
                Add Suppliers
              </button>
              {/* {editCategory ? (
                                      <div className="edit_buttons">
                                        <button className="edit" type="submit">
                                          Save {loading && <FaSpinner className="spin" />}
                                        </button>
                                        <button className="cancel" onClick={(e) => cancelEdit(e)}>
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <button className="add" type="submit">
                                        Add Category
                                        {loading && <FaSpinner className="spin" />}
                                      </button>
                                    )} */}
            </form>
          ) : (
            <div className="msg_container">
              {errorMsg && (
                <div className="error">
                  {errorMsg}
                  <span>
                    <FaRegTimesCircle />
                  </span>
                </div>
              )}
              {info && (
                <div className="info">
                  {info}
                  <span>
                    <FaRegCheckCircle />
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="suppliers">
      <h1>Suppliers Management</h1>
      <div className="container">
        <div className="add_search_box">
          <input placeholder="Search" />
          <button className="add_button" onClick={() => setAddEditModal(1)}>
            Add Suppliers
          </button>
        </div>
        {addEditModal && modalContainer()}
        <div className="table_container"></div>
      </div>
    </div>
  );
}

export default Suppliers;
