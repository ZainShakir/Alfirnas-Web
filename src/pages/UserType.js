import React from 'react'
import {createSearchParams, useNavigate} from "react-router-dom";
import Header from "../Layouts/Header/Header";
import Titel from "../Components/Title"
import { useTranslation } from 'react-i18next';

function UserType() {
    const [t, i18n] = useTranslation();
    const navigate = useNavigate();
    console.log(i18n);
  return (
    <>
     <Titel/>
     <Header  />
   
     <section
        className="py-4 py-xl-5"
        style={{ background: "#ffffff", paddingTop: 43, marginTop: 39 }}
      >

      <div className="container" style={{textAlign: "center",}}>
          <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
            <div
              className="row g-0"
              style={{
                background: "#ffffff",
                border: "6px solid rgb(3,94,95,0.5)",
                justifyContent:'center'
              }}
            >
             
              <div
                className="col-md-6 col-xxl-6 order-first order-md-last"
                style={{ minHeight: 250, paddingTop: 12, marginTop: 75, minWidth: 5}}
              >
                <p
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    letterSpacing: 1,
                    color: "rgb(3,94,95)",
                    fontFamily: "Raleway, sans-serif",
                    textAlign: "center",
                  }}
                >
                  <strong>
                    <span style={{ color: "rgb(50, 119, 119)" }}>
                    {t("MemOption")}
                    </span>
                  </strong>
               
                </p>


                <button
                  className="btn btn-primary text-center"
                  type="button"
                  style={{
                    margin: 13,
                    background: "rgb(3,94,95)",
                    paddingLeft: 39,
                    paddingRight: 39,
                    marginRight: "-3px",
                  
                    fontFamily: "Raleway, sans-serif",
                    borderStyle: "none",
                    color: "rgb(255,255,255)",
                    fontWeight: "bold",
                  }}
                  onClick={()=>navigate({pathname:"/Login",search:createSearchParams({type:"Alfirnas"}).toString()})}
            
                >
                    
                  {/* <a
                    href="/firnas_log"
                    style={{ color: "rgb(255,255,255)", fontSize: 18 }}
                  >
                    {t("Login")}
                  </a> */}
                  Login As Firnas User
                </button>

                <button
                  className="btn btn-primary text-center"
                  type="button"
                  style={{
                    margin: 13,
                    background: "rgb(3,94,95)",
                    paddingLeft: 39,
                    paddingRight: 39,
                    marginRight: "-3px",
                  
                    fontFamily: "Raleway, sans-serif",
                    borderStyle: "none",
                    color: "rgb(255,255,255)",
                    fontWeight: "bold",
                  }}
                  onClick={()=>navigate({pathname:"/Login",search:createSearchParams({type:"Madinah"}).toString()})}
            
                >
                  {/* <a
                    href="/firnas_log"
                    style={{ color: "rgb(255,255,255)", fontSize: 18 }}
                  >
                    {t("Login")}
                  </a> */}
                  Login As Madinah User
                </button>
                
              
              

              </div>





              
            </div>
          </div>
        </div>
     
        




        <div className="container text-muted py-4 py-lg-5">
          <p
            className="mb-0"
            style={{ textAlign: "center", fontFamily: "Raleway, sans-serif" }}
          >
            Firnas Aero © 2023
          </p>
        </div>
      </section>
      <section />
    </>
  )
}

export default UserType