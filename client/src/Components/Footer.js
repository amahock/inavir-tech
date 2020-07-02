import React from "react";
import {routes} from "../Routes/routes";

const Footer =() =>{
    return (
    <footer className="page-footer font-small bg-dark text-white">

    <div className="footer-bg">
        <div className="container">
        <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">Get connected with us on social networks!</h6>
            </div>

            <div className="col-md-6 col-lg-7 text-center text-md-right">
                <a className="fb-ic" href={routes.home}>
                    <i className="fab fa-facebook-f text-white mr-4"> </i>
                </a>
                
                <a className="tw-ic" href={routes.home}>
                    <i className="fab fa-twitter white-text mr-4"> </i>
                </a>
                
                <a className="gplus-ic" href={routes.home}>
                    <i className="fab fa-google-plus-g white-text mr-4"> </i>
                </a>
                
                <a className="li-ic" href={routes.home}>
                    <i className="fab fa-linkedin-in white-text mr-4"> </i>
                </a>
                
                <a className="ins-ic" href={routes.home}>
                    <i className="fab fa-instagram white-text"> </i>
                </a>

            </div>
            

        </div>
        

        </div>
    </div>

    
    <div className="container text-center text-md-left mt-5">  
        <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

            <h6 className="text-uppercase font-weight-bold">InaVir Technologies</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
            <p>Here we are teaching the web development and mobile app Development</p>

        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

            
            <h6 className="text-uppercase font-weight-bold">Products</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
            <p>
            <a href={routes.home}>Web Development</a>
            </p>
            <p>
            <a href={routes.home}>Mobile Development</a>
            </p>
            <p>
            <a href={routes.home}>Full Stack Development</a>
            </p>

        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

            
            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
            <p>
            <a href={routes.home}>Your Account</a>
            </p>
            <p>
            <a href={routes.home}>Course Details</a>
            </p>
            <p>
            <a href={routes.home}>Course Rates</a>
            </p>
            <p>
            <a href={routes.home}>Help</a>
            </p>

        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

            
            <h6 className="text-uppercase font-weight-bold">Contact</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}}/>
            <p>
            <i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
            <p>
            <i className="fas fa-envelope mr-3"></i> info@example.com</p>
            <p>
            <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p>
            <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>

        </div>
        

        </div>
        

    </div>
    

    
    <div className="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://mdbootstrap.com/"> inavir.com</a>
    </div>

    </footer>
    )
}

export default Footer;