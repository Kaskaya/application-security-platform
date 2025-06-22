import { FC } from "react";
import { Trash2 } from "lucide-react";

interface DeleteModalProps {
  itemTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationModal: FC<DeleteModalProps> = ({
  itemTitle,
  onConfirm,
  onClose,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm">
    <div className="bg-[#16171D] rounded-lg shadow-xl w-full max-w-sm m-4 border border-neutral-700">
      <div className="p-6 text-center">
        <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">
          Delete the Vulnerability?
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          This action cannot be undone. "{itemTitle}" will be permanently
          deleted.
        </p>
        <div className="grid grid-cols-2 justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-neutral-600 text-sm font-medium rounded-md hover:bg-neutral-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-sm font-medium text-white rounded-md hover:bg-red-600 cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);
