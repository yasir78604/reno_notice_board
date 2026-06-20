import Link from "next/link";

export default function NoticeCard({
  notice,
  onDelete,
}) {
  return (
    // <div className="border rounded-xl p-5 shadow-lg hover:shadow-xl transition">

    //   <h2 className="text-xl font-bold mb-2">
    //     {notice.title}
    //   </h2>

    //   <p className="mb-2">
    //     {notice.body}
    //   </p>

    //   <p className="mb-2">
    //     Category: {notice.category}
    //   </p>

    //   <p className="mb-2">
    //     Date: {new Date(notice.publishDate).toLocaleDateString()}
    //   </p>

    //   {notice.priority === "URGENT" ? (
    //     <span className="bg-red-500 text-white px-2 py-1 rounded">
    //       URGENT
    //     </span>
    //   ) : (
    //     <span className="bg-gray-300 px-2 py-1 rounded">
    //       NORMAL
    //     </span>
    //   )}

    //   <div className="mt-4 flex gap-2">

    //     <button className="bg-yellow-500 px-3 py-1 text-white">
    //       Edit
    //     </button>

    //     <button className="bg-red-500 px-3 py-1 text-white">
    //       Delete
    //     </button>

    //   </div>

    // </div>
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300">

      {/* Priority badge — top right */}
      <div className="absolute top-5 right-5">
        {notice.priority === "URGENT" ? (
          <span className="flex items-center gap-1.5 bg-red-500/10 text-red-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Urgent
          </span>
        ) : (
          <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-600 px-3 py-1 rounded-full border border-zinc-800">
            Normal
          </span>
        )}
      </div>

      {/* Category eyebrow */}
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-zinc-500 mb-3">
        {notice.category}
      </p>

      {/* Title */}
      <h2 className="text-lg font-bold text-white leading-snug mb-3 pr-20">
        {notice.title}
      </h2>

      {/* Body */}
      <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3">
        {notice.body}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-800 mb-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">

        <p className="text-xs text-zinc-600">
          {new Date(notice.publishDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="flex gap-2">
          <Link href={`/edit/${notice.id}`}>
            <button className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-all duration-200">
              Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete(notice.id)}
            className="text-xs font-medium text-red-400 hover:text-white hover:bg-red-500 px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500 transition-all duration-200">
            Delete
          </button>
        </div>

      </div>

    </div>
  );
}