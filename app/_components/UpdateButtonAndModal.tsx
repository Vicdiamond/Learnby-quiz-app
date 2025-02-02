"use client";

import Modal from "./Modal";
import UpdateModal from "./UpdateModal";

function UpdateButtonAndModal() {
  return (
    <Modal>
      <>
        <Modal.Open opens="updateModal">
          <button className="bg-[#132277] text-white py-2 px-5 rounded-xl self-start ml-3 ">
            Update
          </button>
        </Modal.Open>

        <Modal.Window name="updateModal">
          <UpdateModal />
        </Modal.Window>
      </>
    </Modal>
  );
}

export default UpdateButtonAndModal;
