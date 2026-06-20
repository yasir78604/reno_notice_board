import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function CreateNotice() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
  });

  const router = useRouter();

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
      router.push("/");

      console.log(res.data);
    } catch (error) {
      alert("Error creating notice");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-start justify-center px-6 py-16">
      <div className="w-full max-w-xl">

        {/* Header */}
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-2">
          New Entry
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-10">
          Create Notice
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Notice title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
          />

          {/* Body */}
          <textarea
            name="body"
            placeholder="Write the notice body..."
            value={formData.body}
            onChange={handleChange}
            rows={5}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200 resize-none"
          />

          {/* Category + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="EXAM">Exam</option>
              <option value="EVENT">Event</option>
              <option value="GENERAL">General</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="NORMAL">Normal</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Date */}
          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500 transition-colors duration-200 [color-scheme:dark]"
          />

          {/* Divider */}
          <div className="w-full h-px bg-zinc-800 my-2" />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-white text-black text-sm font-semibold py-3 rounded-full hover:bg-zinc-200 transition-colors duration-200"
          >
            Create Notice
          </button>

        </form>
      </div>
    </div>
  );
}