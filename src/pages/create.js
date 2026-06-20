import { useState } from "react";
import axios from "axios";

export default function CreateNotice() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/notices", formData);

      alert("Notice Created Successfully");

      setFormData({
        title: "",
        body: "",
        category: "GENERAL",
        priority: "NORMAL",
        publishDate: "",
      });

      console.log(res.data);
    } catch (error) {
      alert("Error creating notice");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Create Notice</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="body"
          placeholder="Enter body"
          value={formData.body}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="EXAM">Exam</option>
          <option value="EVENT">Event</option>
          <option value="GENERAL">General</option>
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="NORMAL">Normal</option>
          <option value="URGENT">Urgent</option>
        </select>

        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
        >
          Create Notice
        </button>

      </form>
    </div>
  );
}