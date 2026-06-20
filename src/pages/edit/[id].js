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
    // <div className="max-w-xl mx-auto mt-10 p-5">

    //   <h1 className="text-3xl mb-5">
    //     Edit Notice
    //   </h1>

    //   <form onSubmit={handleSubmit} className="space-y-4">

    //     <input
    //       type="text"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //       className="w-full border p-2"
    //     />

    //     <textarea
    //       name="body"
    //       value={formData.body}
    //       onChange={handleChange}
    //       className="w-full border p-2"
    //     />

    //     <select
    //       name="category"
    //       value={formData.category}
    //       onChange={handleChange}
    //       className="w-full border p-2"
    //     >
    //       <option value="EXAM">Exam</option>
    //       <option value="EVENT">Event</option>
    //       <option value="GENERAL">General</option>
    //     </select>

    //     <select
    //       name="priority"
    //       value={formData.priority}
    //       onChange={handleChange}
    //       className="w-full border p-2"
    //     >
    //       <option value="NORMAL">Normal</option>
    //       <option value="URGENT">Urgent</option>
    //     </select>

    //     <input
    //       type="date"
    //       name="publishDate"
    //       value={formData.publishDate}
    //       onChange={handleChange}
    //       className="w-full border p-2"
    //     />

    //     <button className="bg-green-600 text-white px-4 py-2 rounded">
    //       Update Notice
    //     </button>

    //   </form>

    // </div>
    <div className="min-h-screen bg-[#0f0f0f] flex items-start justify-center px-6 py-16">
      <div className="w-full max-w-xl">

        {/* Header */}
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-2">
          Modify Entry
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-10">
          Edit Notice
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Notice title"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors duration-200"
          />

          {/* Body */}
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Notice body..."
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
            Update Notice
          </button>

        </form>
      </div>
    </div>
  );
}