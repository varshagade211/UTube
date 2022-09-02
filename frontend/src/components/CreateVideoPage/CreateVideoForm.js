import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from "../../store/video";
import './CreateVideoForm.css'
const CreateVideoForm = ({setShowModal}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSpinner, setShowSpinner] = useState(false)
    const [titleCount,setTitleCount] = useState(0)
    const [descCount,setDescCount] = useState(0)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.keys(errors).length){
            return
        }
        setShowSpinner(true)
        dispatch(videoActions.createVideoThunkCreator({ title,description,video }))
        .then((res) => {
            setTitle("");
            setDescription("")
            setVideo(null);
            if(res.status === 200){
                setShowSpinner(false)
                setShowModal(false)
            }
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    const onChangeTitleHandler = (e)=>{
        if(e.target.value.length>100){
            setErrors({...errors,'title':'Title is greater than 100 characters'});
        }if(errors.title){
            delete errors.title
        }
        setTitleCount(e.target.value.length)
        setTitle(e.target.value)
    }
    const onChangeDescriptioneHandler = (e)=>{
        if(e.target.value.length>1000){

            setErrors({...errors,'description':'Description is greater than 1000 characters'});
        }else{
            if(errors.description){
                delete errors.description
            }
        }
        setDescCount(e.target.value.length)
        setDescription(e.target.value)
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setVideo(file);
    };

    return (
    <div className="formandSpinerContainer">
          { isSpinner && <i className="fa-solid fa-circle-notch submitSpinner"></i>}
        <form style={{ display: "flex", flexFlow: "column" }} onSubmit={handleSubmit} novalidate={true}>

            <label>Title</label>
            <input type="text" value={title} onChange={(e) => onChangeTitleHandler(e)} />
            <span>{titleCount}/100</span>
            {errors?.title &&
            <div className="errorContainer">
                <div>
                    <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                </div>
                <div>
                    <span className='error' key={errors.title}>{errors.title}</span>
                </div>
            </div>}
            <label> Description  </label>
            <textarea value={description} onChange={(e) => onChangeDescriptioneHandler(e)} />
            <span>{descCount}/1000</span>
            {errors?.description &&
            <div className="errorContainer">
                <div>
                    <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                </div>
                <div>
                    <span className='error' key={errors.description}>{errors.description}</span>
                </div>
            </div>}
            <label>   </label>
            <input type="file" onChange={updateFile} />
            {errors?.url &&
            <div className="errorContainer">
                <div>
                    <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                </div>
                <div>
                    <span className='error' key={errors.url}>{errors.url}</span>
                </div>
            </div>}
            <button className="createVideoBtn" type="submit">Publish</button>
        </form>

    </div>
  );
};

export default CreateVideoForm;
