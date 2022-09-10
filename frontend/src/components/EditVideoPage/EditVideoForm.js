import React, { useState } from "react";
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from "../../store/video";
import './EditVideoForm.css'

const EditVideoForm = ({video, setShowModal,showModal,setShowDelete}) => {
    const [title, setTitle] = useState(video?.title);
    const [description, setDescription] = useState(video?.description);
    const [titleCount,setTitleCount] = useState(video?.title.length)
    const [descCount,setDescCount] = useState(video?.description.length)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const titleTextArea = useRef(null);
    const descriptionTextArea = useRef(null);
    const titleTextLabel = useRef(null)



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('descroption************',description)
        let id=video?.id
        // if(Object.keys(errors).length){
        //     return
        // }
        dispatch(videoActions.editVideoThunkCreator({id, title, description }))
        .then((res) => {
            setTitle("");
            setDescription("")
            if(res.status === 200){
                setShowModal(false)
                setShowDelete(false)
            }
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    const cancelVideoEditHandler=()=>{
        setShowModal(false)
        setShowDelete(false)
    }

    useEffect(()=>{
        if(showModal){

            titleTextArea.current.style.height = 'auto'
            titleTextArea.current.style.height = titleTextArea.current.scrollHeight + 'px'


            descriptionTextArea.current.style.height = 'auto'
            descriptionTextArea.current.style.height = descriptionTextArea.current.scrollHeight + 'px'


        }
    },[showModal])
    const onChangeTitleHandler = (e)=>{

        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'

        if(e.target.value.length > 100){
            setErrors({...errors,'title':'Title must be less than 100 characters'});
        }else if(e.target.value.length === 0){
            setErrors({...errors,'title':'Title is required'});
        }else if(errors.title){
            delete errors.title
        }
        setTitleCount(e.target.value.length)
        setTitle(e.target.value)
    }
    const onChangeDescriptioneHandler = (e)=>{

        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        if(e.target.value.length>1000){

            setErrors({...errors,'description':'Description must be less than 1000 characters'});
        }else if(e.target.value.length === 0){
            setErrors({...errors,'description':'Description is required'});
        }else if(errors.description){
            delete errors.description
        }
        setDescCount(e.target.value.length)
        setDescription(e.target.value)
    }






    return (
    <div className="editVideoFormContainer">
        <form className="editVideoForm" onSubmit={handleSubmit} novalidate={true}>
            <div className="editVideoTitleContainer">
                <label  ref={titleTextLabel} className="editVideoTitlecLable">Title (required)</label>
                <textarea ref={titleTextArea} className="editVideoTitle" value={title} onChange={(e) => onChangeTitleHandler(e)} />
                <span className="editTitleCount">{titleCount}/100</span>
                {errors?.title &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation editVideoErrorlogo"></i>
                        <span className='editVideoError' key={errors.title}>{errors.title}</span>
                    </div>
                </div>}

            </div>
            <div className="editVideoDescContainer">
                <label className="editVideoDescLable"> Description (required)</label>
                <textarea ref={descriptionTextArea} className="editVideoDesc" value={description} onChange={(e) => onChangeDescriptioneHandler(e)} />
                <span  className="editDescCount">{descCount}/1000</span>
                {errors?.description &&
                <div className="errorContainer">
                    <div>
                        <i class="fa-solid fa-circle-exclamation editVideoErrorlogo"></i>
                        <span className='editVideoError' key={errors.description}>{errors.description}</span>
                    </div>
                </div>}

            </div>
            <div className="editVideoBtnContainer">

                <button className="editVideoFormBtn" type="button" onClick={cancelVideoEditHandler}>CANCEL</button>
                {/* <button className="editVideoFormBtn"type="submit" disabled={Object.keys(errors).length}>SAVE</button> */}
                 <button className="editVideoFormBtn"type="submit" >SAVE</button>


            </div>
        </form>
    </div>
  );
};

export default EditVideoForm;
