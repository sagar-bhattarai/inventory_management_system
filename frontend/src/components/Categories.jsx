import React, { useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/categories/add",
        { categoryName, categoryDescription },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-refreshToken")}`,
          },
        }
      );

      if (response.data.success) {
        console.log("category added", response);
      }else{
        console.log("error on adding category", response)
      }

    } catch (error) {
      console.log("error", error);
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
            <button type="submit" className="cursor-pointer bg-orange-300 hover:bg-orange-500">Add Category</button>
          </form>
        </div>
        <div className="cat_right_container"></div>
      </div>
    </div>
  );
};

export default Categories;
