import React, { useState } from "react";
import Form from "./Form";
import Modal from "../../ui/Modal/Modal"

const QuizRoomTrollPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div>QuizRoomTrollPage

          <button
        
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>
       {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </div>
    )
}

export default QuizRoomTrollPage;