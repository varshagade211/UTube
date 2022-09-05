import React, { useContext, useState } from 'react';
import { Modal ,isModalOnContext} from '../../context/Modal';
import DeleteVideoForm from './DeleteVideoForm';
import DeleteCommentForm from './DeleteCommentForm'
import './index.css'
function DeleteVideoFormModal(prop) {
  const [showModal, setShowModal] = useState(false);
  const {isModalOpen,setIsModalOpen} = useContext(isModalOnContext)


  const openModalHandler = () => {
    setShowModal(true)
    setIsModalOpen(true)
  }
  const closeModalHandler=()=>{
    setShowModal(false)
    setIsModalOpen(false)
  }
  return (
    <>
      {/* <div className='editVideoIconContainer' onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-pencil editVideoPencilIcon"></i>
        <p className='editVidEdit'> Edit</p></div> */}

        <div className='flatVideoDelBtnContainer'  onClick={openModalHandler}>
            <i className="fa-solid fa-trash flatVidTrashIcon"></i>
            <p className='flatVidDelete'>Delete</p>
        </div>
      {showModal && (
        <Modal onClose={closeModalHandler}>

          {prop.type=== "video" && <DeleteVideoForm video={prop?.video} setShowModal={setShowModal}  setShowDelete={prop.setShowDelete} />}
          {prop.type=== "comment" && <DeleteCommentForm comment={prop?.comment} setShowModal={setShowModal} />}
        </Modal>
      )}
    </>
  );
}

export default DeleteVideoFormModal;
