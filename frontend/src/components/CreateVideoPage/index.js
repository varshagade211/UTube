import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateVideoForm from './CreateVideoForm';
import './index.css'
function CreateVideoFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='createVideoIconBtn' onClick={() => setShowModal(true)}><i className="fa-solid fa-video createVideoIcon"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateVideoForm />
        </Modal>
      )}
    </>
  );
}

export default CreateVideoFormModal;
