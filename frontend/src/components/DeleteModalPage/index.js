import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteVideoForm from './DeleteVideoForm';
import DeleteCommentForm from './DeleteCommentForm'
import './index.css'
function DeleteVideoFormModal(prop) {
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
          {prop.type=== "video" && <DeleteVideoForm video={prop?.video} setShowModal={setShowModal} />}
          {prop.type=== "comment" && <DeleteCommentForm comment={prop?.comment} setShowModal={setShowModal} />}
        </Modal>
      )}
    </>
  );
}

export default DeleteVideoFormModal;
