import React, { useState } from "react";
import axios from "axios";
import constant from "../constant.js";

function Suppliers() {
    const [addEditModal, setAddEditModal] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [suppliers, setSuppliers] = useState([]);
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [editSupplier, setEditSupplier] = useState(false);
    const url = `${constant.PATH}/suppliers`;

    const handleChangeOnModal = (e) => {
         // console.log(e.target);  //  <input placeholder="Enter supplier Email" required="" type="email" value="admin@gmail.com" name="email">
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value   // name="email" , name="phone" etc..
        }));

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
                response = await axios.post(
                    `${url}/add`,
                    formData,
                    constant.HEADERS
                );
            }
            console.log("response", response)
            if (response) {
                setAddEditModal(null);
                // setCategoryName("");
                // setCategoryDescription("");
                // setEditCategory("");
                // fetchAllCategories();
                // setInformation("info", `${categoryName} ${response.data.message}`);
            }
        } catch (error) {
            console.log("error", error)
            //   if (error.response.data.message) {
            //     // setInformation("error", error.response.data.message);
            //   } else {
            //     // setInformation("error", error.response.statusText);
            //   }
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
                        <button className="add_button" onClick={() => ""}>
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

                        <div>
                            {errorMsg && <p className="error">{errorMsg}</p>}
                            {info && <p className="info">{info}</p>}
                        </div>
                    </form>
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
