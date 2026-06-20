export default function DeleteModal({
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

      <div className="bg-gray-900 p-6 rounded-xl w-96">

        <h2 className="text-xl mb-4 text-white">
          Are you sure?
        </h2>

        <p className="mb-5 text-gray-300">
          This notice will be permanently deleted.
        </p>

        <div className="flex gap-3">

          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}