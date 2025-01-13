import React, { useState, useEffect } from "react";

const RecipeModal = ({ isOpen, onRequestClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    introduction: "",
    ingredients: [],
    steps: [],
    benefits: [],
    faqs: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        imageUrl: "",
        introduction: "",
        ingredients: [],
        steps: [],
        benefits: [],
        faqs: [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e, index, field, subfield) => {
    const newArray = [...formData[field]];
    newArray[index][subfield] = e.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        field === "faqs" ? { question: "", answer: "" } : "",
      ],
    }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6  w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl mb-4">
          {initialData ? "Edit Recipe" : "Add Recipe"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Introduction</label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-gray-700">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(e, index, "ingredients")}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("ingredients", index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("ingredients")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Ingredient
            </button>
          </div>

          {/* Steps */}
          <div className="mb-4">
            <label className="block text-gray-700">Steps</label>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleArrayChange(e, index, "steps")}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("steps", index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("steps")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Step
            </button>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <label className="block text-gray-700">Benefits</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(e, index, "benefits")}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("benefits", index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("benefits")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Benefit
            </button>
          </div>

          {/* FAQs */}
          <div className="mb-4">
            <label className="block text-gray-700">FAQs</label>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      handleArrayChange(e, index, "faqs", "question")
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Question"
                  />
                  <input
                    type="text"
                    value={faq.answer}
                    onChange={(e) =>
                      handleArrayChange(e, index, "faqs", "answer")
                    }
                    className="w-full p-2 border rounded ml-2"
                    placeholder="Answer"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("faqs", index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("faqs")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add FAQ
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClose}
              className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeModal;
