import React,{Fragment, useContext} from "react";
import {useHistory} from "react-router-dom";
import image1 from "../Images/image1.jpg";
import Footer from "./Footer";
import SecondPage from "./SecondPage";
import {userContext} from "../Context/Context";
import {routes} from "../Routes/routes";

const MainContent = () => {
    const history = useHistory();
    const dataFromContext = useContext(userContext);
    const knowMoreFunc = () =>{
        // dataFromContext.setKnowMoreButtonClicked(true);
        history.push(routes.knowMore);
    }

    return (
        <Fragment>
        <div className="container-fluid container-no-p bg-img-cnt1">
            <section className="text-center text-white">
                <div className="display-4 text-center font-weight-bold page1-cnt1"> 
                    <p className=""> Online IT jobs and Digital training</p> 
                </div>
                <h4 className="">
                    India's best platform to get trained live online and get job opportunities from us to work from home!
                </h4>
                <br/>
                <button type="button" className="btn btn-lg text-center text-white know-more-btn"
                onClick={knowMoreFunc}>
                    Know more
                </button>
            </section>
        </div>
            {/* <section className="d-flex p-5 bg-dark text-white justify-content-center">
                <div className="flex-fill text-center">
                    Web Development<br/>
                    <button>Know more</button>
                </div>
                <div className="flex-fill text-center">
                    Mobile Development
                    <br/>
                    <button>Know more</button>
                </div>
            </section> */}
            
        </Fragment>

    )
}

export default MainContent;