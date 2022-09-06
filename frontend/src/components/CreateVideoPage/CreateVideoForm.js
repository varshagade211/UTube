import React, { useState } from "react";
import { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
    const createVideoTag = useRef(null);
    const [preview,setPreview] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!Object.keys(errors).length){
            setShowSpinner(true)
        }
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
            setShowSpinner(false)
            const data = await res.json();
            if(!video && data.errors.url === undefined) {
                data.errors["url"]='Video url cannot be empty'
            }
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    const onChangeTitleHandler = (e)=>{
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'

        if(e.target.value.length>100){
            setErrors({...errors,'title':'Title is greater than 100 characters'});
        }if(errors.title){
            delete errors.title
        }
        setTitleCount(e.target.value.length)
        setTitle(e.target.value)
    }
    const onChangeDescriptioneHandler = (e)=>{
        e.target.style.height = 'auto'

        e.target.style.height = e.target.scrollHeight + 'px'
        // e.target.style.height= e.target.scrollHeight + 14 +'px'


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
        if (file){
            if(errors?.url){
                delete errors.url
            }
            if(!title){

                setTitle(file.name)
            }
            if(errors?.title){
                delete errors.title
            }
            setPreview(URL.createObjectURL(file))
        }
        setVideo(file);
    };

    useEffect(() => {

        if(createVideoTag.current){
            createVideoTag.current.load()

        }
    },[preview])
    // const downloadHandler = ()=>{
    //     history.push("https://amazon-clone-bucket.s3.us-west-1.amazonaws.com/1662419930486.mp4")
    // }

    return (
    <div className="formandSpinerContainer">
        { isSpinner &&
        <i className="fa-solid fa-circle-notch submitSpinner"></i> }


        <form  className="createVideoForm" onSubmit={handleSubmit} novalidate={true}>
            <div className="createVideoPageTitleContainer">
                {title? <p className="createVideoPageTital">{title?.substring(0, 100)}</p> : <p className="createVideoPageTital">{video?.name?.substring(0, 100)}</p>}
            </div>
            <div className="createVideoFormInputContainer">

                <div className="createFormTitleDescContainer">
                <h3 className="createVideoDetail">Details</h3>
                    <div className="createTitalConatainer">

                    <label  className="titleLable">Title (required)</label>
                    <textarea type="text" value={title} className="createFormTitleInput"
                    placeholder="Add a title that describes your video (Default is file name)"
                    onChange={(e) => onChangeTitleHandler(e)} />
                    <span className="titleCharCount">{titleCount}/100</span>
                    {errors?.title &&
                        <div className="errorContainer">
                            <div>
                                <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                                <span className='createFormErrorError' key={errors.title}>{errors.title}</span>
                            </div>

                        </div>
                    }
                    </div>


                   <div className="createDescripConatainer" >

                    <label className="descLable"> Description (required) </label>

                    <textarea value={description} rows={5}
                     className="createFormDescriptionInput"
                     placeholder="Tell viewers about your video"
                      onChange={(e) => onChangeDescriptioneHandler(e)} />
                    <span className="discCharCount">{descCount}/1000</span>
                    {errors?.description &&
                        <div className="errorContainer">
                            <div>
                                <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i>
                                <span className='createFormErrorError' key={errors.description}>{errors.description}</span>
                            </div>

                        </div>
                    }

                   </div>
                   {/* <div className="createVideoFormButtonContainer">
                        <button className="createVideoBtn" type="submit">Publish</button>
                        <button className="createVideoBtn" onClick ={()=>setShowModal(false)} type="button">Cancel</button>
                     </div> */}


                </div>

                <div className="createFormUploadContainer">


                    <div className="previewVidContainer">
                       {preview ?

                        <video ref={createVideoTag} className='previewVid'  controls muted playsInline >
                         <source src={preview} type={video?.type} id="videoSource"/>
                        </video>:
                       <div className="previewPlaceHolder">
                          <label for='file'><i className="fa-solid fa-upload uploadVidoIcon"></i></label>
                       </div>
                        }
                         <div className="uploadInputContainer">

                            <input type="file" id="file" title=" " className="uploadInput" onChange={updateFile} />
                            <p className="downloadVideo">Need a video file to test the upload feature?</p>
                            <a className="downloadVideoLink" href="https://amazon-clone-bucket.s3.us-west-1.amazonaws.com/1662419930486.mp4">Download Demo Video</a>
                             {/* <button onClick={downloadHandler}>Button</button> */}
                        </div>
                        {errors?.url &&
                        <div className="errorContainer">
                            <div>
                                <i class="fa-solid fa-circle-exclamation createFormErrorlogo"></i>

                                <span className='createFormErrorError' key={errors.url}>{errors.url}</span>
                            </div>
                        </div>
                    }

                    </div>
                    {/* <div className="uploadInputContainer">

                         <input type="file" id="file" title=" " className="uploadInput" onChange={updateFile} />

                    </div> */}


                    {/* <p>{video?.name}</p> */}

                </div>
            </div>

             <div className="createVideoFormButtonContainer">
                <button className="createVideoBtn" type="submit">Publish</button>

                <button className="createVideoBtn" onClick ={()=>setShowModal(false)} type="button">Cancel</button>
            </div>
        </form>
    </div>
  );
};

export default CreateVideoForm;
