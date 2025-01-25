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
    setFormData(
      initialData || {
        title: "",
        imageUrl: "",
        introduction: "",
        ingredients: [],
        steps: [],
        benefits: [],
        faqs: [],
      }
    );
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (field, index, value, subfield) => {
    const updatedArray = [...formData[field]];
    if (subfield) {
      updatedArray[index][subfield] = value;
    } else {
      updatedArray[index] = value;
    }
    setFormData((prevData) => ({ ...prevData, [field]: updatedArray }));
  };

  const addArrayItem = (field) => {
    const newItem = field === "faqs" ? { question: "", answer: "" } : "";
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], newItem],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Recipe" : "Add Recipe"}
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            required
          />
          <InputField
            label="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
          <TextAreaField
            label="Introduction"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            placeholder="Briefly introduce the recipe"
            required
          />

          <ArrayInput
            label="Ingredients"
            items={formData.ingredients}
            onChange={(index, value) =>
              handleArrayChange("ingredients", index, value)
            }
            onAdd={() => addArrayItem("ingredients")}
            onRemove={(index) => removeArrayItem("ingredients", index)}
            placeholder="Enter ingredient"
          />

          <ArrayInput
            label="Steps"
            items={formData.steps}
            onChange={(index, value) =>
              handleArrayChange("steps", index, value)
            }
            onAdd={() => addArrayItem("steps")}
            onRemove={(index) => removeArrayItem("steps", index)}
            placeholder="Enter step"
          />

          <ArrayInput
            label="Benefits"
            items={formData.benefits}
            onChange={(index, value) =>
              handleArrayChange("benefits", index, value)
            }
            onAdd={() => addArrayItem("benefits")}
            onRemove={(index) => removeArrayItem("benefits", index)}
            placeholder="Enter benefit"
          />

          <ArrayInput
            label="FAQs"
            items={formData.faqs}
            onChange={(index, value, subfield) =>
              handleArrayChange("faqs", index, value, subfield)
            }
            onAdd={() => addArrayItem("faqs")}
            onRemove={(index) => removeArrayItem("faqs", index)}
            isFAQ
          />

          <div className="flex justify-end mt-4">
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

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1">{label}</label>
    <input {...props} className="w-full p-2 border rounded" />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-1">{label}</label>
    <textarea {...props} className="w-full p-2 border rounded"></textarea>
  </div>
);

const ArrayInput = ({
  label,
  items,
  onChange,
  onAdd,
  onRemove,
  placeholder,
  isFAQ = false,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    {items.map((item, index) => (
      <div key={index} className="flex items-center mb-2">
        {isFAQ ? (
          <>
            <input
              type="text"
              value={item.question}
              onChange={(e) => onChange(index, e.target.value, "question")}
              className="w-full p-2 border rounded"
              placeholder="Question"
            />
            <input
              type="text"
              value={item.answer}
              onChange={(e) => onChange(index, e.target.value, "answer")}
              className="w-full p-2 border rounded ml-2"
              placeholder="Answer"
            />
          </>
        ) : (
          <input
            type="text"
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={placeholder}
          />
        )}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
        >
          -
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
    >
      Add {label}
    </button>
  </div>
);

export default RecipeModal;
