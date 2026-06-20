import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    priority: "",
    publishDate: "",
  });

  useEffect(() => {
    if (id) {
      fetchNotice();
    }
  }, [id]);

  const fetchNotice = async () => {
    try {
      const res = await axios.get(`/api/notices/${id}`);

      setFormData({
        title: res.data.title,
        body: res.data.body,
        category: res.data.category,
        priority: res.data.priority,
        publishDate: res.data.publishDate.split("T")[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/notices/${id}`, formData);

      alert("Notice Updated Successfully");

      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">

      <h1 className="text-3xl mb-5">
        Edit Notice
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="body"
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

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Notice
        </button>

      </form>

    </div>
  );
}