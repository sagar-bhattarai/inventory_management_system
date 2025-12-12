import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegTrashAlt, FaRegEdit, FaSpinner } from "react-icons/fa";
// import { FaSpinner, FaCircleNotch } from "react-icons/fa";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState("");

  const url = `http://localhost:8000/api/v1/categories`;
  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("pos-accessToken")}`,
    },
  };

  const setInformation = (msgType, msg) => {
    if (msgType == "info") {
      setInfo(msg);
    } else {
      setErrorMsg(msg);
    }
    setTimeout(() => {
      setInfo("");
      setErrorMsg("");
    }, 2000);
  };

  const fetchAllCategories = async () => {
    setInfo("");
    setLoading(true);
    setErrorMsg(false);
    try {
      const response = await axios.get(`${url}/all`, headers);
      if (response) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      if (error.response.data.message) {
        setInformation("error", error.response.data.message);
      } else {
        setInformation("error", error.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfo("");
    setErrorMsg(false);
    try {
      let response = null;
      if (editCategory) {
        response = await axios.put(
          `${url}/update/${editCategory}`,
          { categoryName, categoryDescription },
          headers
        );
      } else {
        response = await axios.post(
          `${url}/add`,
          { categoryName, categoryDescription },
          headers
        );
      }
      if (response) {
        setCategoryName("");
        setCategoryDescription("");
        setEditCategory("");
        fetchAllCategories();
        setInformation("info", `${categoryName} ${response.data.message}`);
      }
    } catch (error) {
      if (error.response.data.message) {
        setInformation("error", error.response.data.message);
      } else {
        setInformation("error", error.response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const edit_category = (cat) => {
    setEditCategory(cat._id);
    setCategoryName(cat.categoryName);
    setCategoryDescription(cat.categoryDescription);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setCategoryName("");
    setCategoryDescription("");
    setEditCategory("");
  };

  const delete_category = async (id) => {
    const confirmDelete = window.confirm("Are you sure, you want to delete this category?");
    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await axios.delete(`${url}/delete/${id}`, headers);
        if (response) {
          fetchAllCategories();
          setCategoryName("");
          setCategoryDescription("");
          setEditCategory("");
          setInformation("info", `${categoryName} ${response.data.message}`);
        }
      } catch (error) {
        if (error.response.data.message) {
          setInformation("error", error.response.data.message);
        } else {
          setInformation("error", error.response.statusText);
        }
      } finally {
        setLoading(false);
      }
    }

  };
  const categoryElement = () => (
    <>
      {categories && categories.length > 0 ? (
        <table>
          <thead>
            <tr>
              <td>S.N</td>
              <td>Category Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
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
                    {loading ? <FaSpinner className="spin" /> : <> <FaRegTrashAlt /> <span>Delete</span></>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="info">Categories not found.</div>
      )}
      <>{loading && <span className="categories_loading"> {loading && <FaSpinner className="spin" />} Loading All Categories...</span>}</>
    </>
  );
  return (
    <div className="category">
      <h1>Category Management</h1>

      <div className="category_container">
        <div className="category_left_container">
          <h2>{editCategory ? "Edit Category" : "Add New Category"}</h2>
          <form className="category_form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter Category Name"
                required
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label>Category Description</label>
              <textarea
                type="text"
                placeholder="Category Description (Optional)"
                required
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            {editCategory ? (
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
            )}

            <div>
              {errorMsg && <p className="error">{errorMsg}</p>}
              {info && <p className="info">{info}</p>}
            </div>
          </form>
        </div>
        <div className="category_right_container">
          <div className="search_category">
            <input
              placeholder="Search Categories.."
              onChange={""}
            />
          </div>

          {categoryElement()}
        </div>
      </div>
    </div>
  );
};

export default Categories;
