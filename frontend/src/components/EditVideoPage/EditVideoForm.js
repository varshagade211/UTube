import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from "../../store/video";

const EditVideoForm = ({video, setShowModal}) => {
    const [title, setTitle] = useState(video?.title);
    const [description, setDescription] = useState(video?.description);
    const [titleCount,setTitleCount] = useState(video?.title.length)
    const [descCount,setDescCount] = useState(video?.description.length)
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        let id=video?.id
        if(Object.keys(errors).length){
            return
        }
        dispatch(videoActions.editVideoThunkCreator({id, title, description }))
        .then((res) => {
            setTitle("");
            setDescription("")
            if(res.status === 200){
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
            setErrors({...errors,'title':'title is greter than 100 charactor'});
        }if(errors.title){
            delete errors.title
        }
        setTitleCount(e.target.value.length)
        setTitle(e.target.value)
    }
    const onChangeDescriptioneHandler = (e)=>{
        if(e.target.value.length>1000){
            
            setErrors({...errors,'description':'description is greter than 1000 charactor'});
        }else{
            if(errors.description){
                delete errors.description
            }
        }
        setDescCount(e.target.value.length)
        setDescription(e.target.value)
    }



    return (
    <div>
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
            {/* <input type="file" onChange={updateFile} /> */}
            {/* {errors?.url &&
            <div className="errorContainer">
                <div>
                    <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                </div>
                <div>
                    <span className='error' key={errors.url}>{errors.url}</span>
                </div>
            </div>} */}
            <button type="submit">Edit</button>
        </form>
        {/* <div>
            {videoUrl && <video width="400" controls autoPlay={true} muted playsInline >
                <source src={videoUrl} type="video/mp4"/>
            </video>}
        </div> */}
    </div>
  );
};

export default EditVideoForm;
