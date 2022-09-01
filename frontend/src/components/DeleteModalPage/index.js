import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteVideoForm from './DeleteVideoForm';
import './index.css'
function DeleteVideoFormModal({video}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className='editVideoIconContainer' onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-pencil editVideoPencilIcon"></i>
        <p className='editVidEdit'> Edit</p></div> */}

        <div className='flatVideoDelBtnContainer'  onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-trash flatVidTrashIcon"></i>
            <p className='flatVidDelete'>Delete</p>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteVideoForm video={video} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteVideoFormModal;
