import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditVideoForm from './EditVideoForm';
import './index.css'
function EditVideoFormModal({video,setShowDelete}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='editVideoIconContainer' onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-pencil editVideoPencilIcon"></i>
        <p className='editVidEdit'> Edit</p></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditVideoForm video={video} setShowDelete={setShowDelete} setShowModal={setShowModal} showModal={showModal} />
        </Modal>
      )}
    </>
  );
}

export default EditVideoFormModal;
