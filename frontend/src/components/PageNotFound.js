import { useHistory } from "react-router-dom"
import './PageNotFound.css'
function PageNotFound(){
    const history = useHistory()
    return (

        <div className="pageNotFoundContainer">
            <p className="fourOfourNumber">404</p>
            <i className="fa-brands fa-searchengin pageNotFoundSearchIcon"></i>
            <p className="notFoundError">This page isn't available. Sorry about that. Try navigating back to
            <span className= 'pageNotFoundHomeLink' onClick={()=>history.push('/')}>Home</span>
            </p>



            <div className="pageNotFoundLogoAndNameContainer">
              <i class="fa-solid fa-circle-play pageNotFoundLogo" onClick={()=>history.push('/')}></i>
               <p className='pageNotFoundLogoName' onClick={()=>history.push('/')}>UTube</p>
            </div>

        </div>

    )
}


export default PageNotFound
