import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import NoticeCard from "../components/NoticeCard";
import DeleteModal from "../components/DeleteModal";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/notices/${selectedId}`);

      setShowModal(false);

      fetchNotices();

    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const fetchNotices = async () => {
    try {
      const res = await axios.get("/api/notices");
      setNotices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (

    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12 md:px-16">

      {/* Header row */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-1">
            Latest Updates
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Notice Board
          </h1>
        </div>

        <Link href="/create">
          <button className="group flex items-center gap-2 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors duration-200">
            <span className="text-lg leading-none">+</span>
            Add Notice
          </button>
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-800 mb-10" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {notices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onDelete={openDeleteModal}
          />
        ))}
      </div>

      {showModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

    </div>
  );
}