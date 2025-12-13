import React, { useState } from "react";
import axios from "axios";
import constant from "../constant.js";
import {
    FaRegCheckCircle,
    FaRegTimesCircle,
    FaRegTrashAlt,
    FaRegEdit,
    FaSpinner,
} from "react-icons/fa";
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

    const fetchAllSuppliers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/all`, constant.HEADERS);
            setSuppliers(response.data.suppliers);
        } catch (error) {
            setErrorMsg(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSuppliers();
    }, []);

    const handleChangeOnModal = (e) => {
        // console.log(e.target);  //  <input placeholder="Enter supplier Email" required="" type="email" value="admin@gmail.com" name="email">
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // name="email" , name="phone" etc..
        }));
    };

    const unsetFormData = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
        });
    };
    const hideModal = () => {
        setTimeout(() => {
            setAddEditModal(null);
            setInfo("");
            setErrorMsg(false);
            unsetFormData();
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
                response = await axios.put(`${url}/update/${editSupplier}`, formData, constant.HEADERS);
            } else {
                response = await axios.post(`${url}/add`, formData, constant.HEADERS);
            }
            if (response) {
                setInfo(`${formData.name} ${response.data.message}`);
                hideModal();
                fetchAllSuppliers();
            }
        } catch (error) {
            setErrorMsg(error.response.data.message);
            hideModal();
        } finally {
            setLoading(false);
        }
    };

    const edit_supplier = (supplier) => {
        setEditSupplier(supplier._id);
        setAddEditModal(2);
        setFormData({
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address,
        });
    };

    const cancel_Add_Edit = (e) => {
        e.preventDefault();
        unsetFormData();
        setEditSupplier("");
        setAddEditModal(null);
    };

    const delete_supplier = async (id) => {
        const confirmDelete = window.confirm("Are you sure, you want to delete this Supplier?");
        if (confirmDelete) {
            setLoading(true);
            try {
                const response = await axios.delete(`${url}/delete/${id}`, constant.HEADERS);
                if (response) {
                    setEditSupplier("");
                    fetchAllSuppliers();
                    // setInfo(response.data.message);
                    alert(response.data.message);
                }
            } catch (error) {
                alert(error.response.data.message)
                setErrorMsg(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    }

    const modalContainer = () => {
        return (
            <div className="add_edit_modal">
                <div className="modal_wrapper">
                    <div className="top_container">
                        <h1>{editSupplier ? "Edit Supplier" : "Add Supplier"}</h1>
                        <button
                            className="cancel_button"
                            onClick={cancel_Add_Edit}
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

                            {editSupplier ? (
                                <div className="edit_buttons">
                                    <button className="edit_button" type="submit">
                                        Save {loading && <FaSpinner className="spin" />}
                                    </button>
                                    <button
                                        className="cancel_button"
                                        onClick={(e) => cancel_Add_Edit(e)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button className="add_button" type="submit">
                                    Add supplier {loading && <FaSpinner className="spin" />}
                                </button>
                            )}
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
                <div className="table_container">
                    <>
                        {loading ? (
                            <span className="suppliers_loading">
                                Loading AllSuppliers... {loading && <FaSpinner className="spin" />} 
                            </span>
                        ) : suppliers && suppliers.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <td>S.N</td>
                                        <td>Supplier Name</td>
                                        <td>Email</td>
                                        <td>Phone</td>
                                        <td>Address</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((supplier, index) => (
                                        <tr key={supplier._id}>
                                            <td>{index + 1}</td>
                                            <td>{supplier.name}</td>
                                            <td>{supplier.email}</td>
                                            <td>{supplier.phone}</td>
                                            <td>{supplier.address}</td>
                                            <td className="td_actions">
                                                <button
                                                    onClick={() => edit_supplier(supplier)}
                                                    className="edit"
                                                >
                                                    <FaRegEdit /> <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => delete_supplier(supplier._id)}
                                                    className="delete"
                                                >
                                                    {loading ? (
                                                        <FaSpinner className="spin" />
                                                    ) : (
                                                        <>
                                                            {" "}
                                                            <FaRegTrashAlt /> <span>Delete</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="info">suppliers not found, please add ...</div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}

export default Suppliers;
