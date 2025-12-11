import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [errType, setErrType] = useState("");
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState("");


  const url = `http://localhost:8000/api/v1/categories`
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "pos-accessToken"
      )}`,
    },
  }

  const fetchAllCategories = async () => {
    setError("");
    setInfo("");
    setLoading(!loading);
    try {
      const response = await axios.get(`${url}/all`, headers);
      // console.log("response", response)
      if (response) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      // console.log("error", error)
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const type_err_info_loading = (
    displayOn = "",
    error = "",
    info = "",
    loading = false
  ) => {
    setErrType(displayOn);
    setError(error);
    setInfo(info);
    setLoading(loading);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      setLoading(!loading);
      const response = await axios.post(
        `${url}/add`,
        { categoryName, categoryDescription },
        headers
      );

      // console.log("response", response)
      if (response) {
        setInfo(`${categoryName} category added successfully`);
        fetchAllCategories();
      }
    } catch (error) {
      // console.log("error", error)
      setError(error.response.data);
    } finally {
      setCategoryName("");
      setCategoryDescription("");
      setLoading(false);
    }
  };

  const edit_category = async (category) => {
    setEditCategory(category._id)
    type_err_info_loading("edit", "", "", true);
    try {
      let categoryName = "testHGHCG";
      let categoryDescription = "testing";

      const response = await axios.put(
        `${url}/update/${category._id}`,
        { categoryName, categoryDescription },
        headers
      );
      console.log("response", response);
      if (response) {
        type_err_info_loading("edit", "", response.data.message, true);
      }
    } catch (error) {
      console.log("error", error);
      type_err_info_loading("edit", error.message, "", true);
    } finally {
      type_err_info_loading();
    }
  };

  const delete_category = async (e) => { };
  const categoryElement = () => (
    <>
      {loading && <span>Loading All Categories...</span>}
      {categories ? (
        <table>
          <thead>
            <tr>
              <td>S.N</td>
              <td>Category Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td className="td_actions">
                  <button
                    onClick={() => edit_category(category)}
                    className="edit"
                  >
                    <FaRegEdit /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => delete_category(category._id)}
                    className="delete"
                  >
                    <FaRegTrashAlt /> <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))

              : <span className="cat_not_found">Categories not found</span>}
          </tbody>
        </table>
      ) : (
        <p className="error">{error}</p>
      )}
    </>
  );
  return (
    <div className="category">
      <h1>Category Management</h1>

      <div className="category_container">
        <div className="category_left_container">
          <h2>{editCategory ? "Edit Category" : "Add Category"}</h2>
          <form className="category_form" onSubmit={editCategory ? edit_category : handleSubmit}>
            <div className="input_container">
              <input
                type="text"
                placeholder="Category Name"
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="input_container">
              <input
                type="text"
                placeholder="Category Description"
                required
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            {editCategory ?
              <div className="edit_buttons">
                <button className="edit" type="submit">
                  {loading ? "Updating..." : "Edit Category"}
                </button>
                <button className="cancel" onClick={() => ""}>Cancel</button>
              </div>
              :
              <button className="add" type="submit">
                {loading ? "Adding..." : "Add Category"}
              </button>
            }

            <span>
              {error && <div className="error">{error}</div>}
              {info && <div className="info">{info}</div>}
            </span>
          </form>
        </div>
        <div className="category_right_container">{categoryElement()}</div>
      </div>
    </div>
  );
};

export default Categories;
