import React, { useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex flex-col">
      <h1>Category Management</h1>

      <div className="cat_container flex">
        <div className="cat_left_container flex flex-col">
          <h2>Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Category Name"
                className="border"
                required
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Category Description"
                className="border"
                required
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-orange-300 hover:bg-orange-500"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
            <span>
              {error && (
                <div className="bg-red-200 py-2 px-4 my-4 rounded">{error}</div>
              )}
              {info && (
                <div className="bg-green-200 py-2 px-4 my-4 rounded">
                  {info}
                </div>
              )}
            </span>
          </form>
        </div>
        <div className="cat_right_container"></div>
      </div>
    </div>
  );
};

export default Categories;
