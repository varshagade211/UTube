import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from "../../store/video";

const CreateVideoForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    let videoUrl = ''
    const handleSubmit = (e) => {
        e.preventDefault();
        videoUrl = dispatch(videoActions.createVideoThunkCreator({ title,description,video }))
        .then(() => {
            setTitle("");
            setDescription("")
            setVideo(null);
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setVideo(file);
    };

    return (
    <div>
        <form style={{ display: "flex", flexFlow: "column" }} onSubmit={handleSubmit} novalidate={true}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
            <button type="submit">Publish</button>
        </form>
        <div>
            {videoUrl && <video width="400" controls autoPlay={true} muted playsInline >
                <source src={videoUrl} type="video/mp4"/>
            </video>}
        </div>
    </div>
  );
};

export default CreateVideoForm;
