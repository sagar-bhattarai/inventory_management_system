import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setError(null);
      setInfo(null);
      setLoading(!loading);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/categories/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "pos-accessToken"
              )}`,
            },
          }
        );
        if (response) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      setLoading(!loading);
      const response = await axios.post(
        "http://localhost:8000/api/v1/categories/add",
        { categoryName, categoryDescription },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        setInfo(`${categoryName} category added successfully`);
      }
    } catch (error) {
      setError(error.response.data.errors);
    } finally {
      setCategoryName("");
      setCategoryDescription("");
      setLoading(false);
    }
  };

  const categoryElement = () => (
    <>
      {loading && <span>Loading All Categories...</span>}
      {categories ? (
        <table>
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Category Description</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.categoryName}</td>
                <td>{category.categoryDescription}</td>
                <td className="td_actions">
                  <button className="edit">edit</button>
                  <button className="delete">delete</button>
                </td>
              </tr>
            ))}
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
          <h2>Add Category</h2>
          <form className="category_form" onSubmit={handleSubmit}>
            <div className="input_container">
              <input
                type="text"
                placeholder="Category Name"
                required
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="input_container">
              <input
                type="text"
                placeholder="Category Description"
                required
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            <button type="submit">
              {loading ? "Adding..." : "Add Category"}
            </button>
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
