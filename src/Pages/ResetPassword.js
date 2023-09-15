import React, {  useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"
import Header from "../Layouts/Header/Header";
import { useTranslation } from 'react-i18next';
import Titel from "../Components/Title"
import {  Alert } from "react-bootstrap"

function ResetPassword() {
  const [t, i18n] = useTranslation();
  const [email,setEmail]=useState();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email);
      setMessage("Check your Email for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }
  console.log(i18n);
  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Titel/>
        <Header/>
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
                    {t("Reset")}
                    </span>
                  </strong>
                </p>
                <div>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                </div>
                <div
                  style={{
                    background: "#f1f1f1",
                    borderRadius: 25,
                     padding: 7,
                    // textAlign: "left",
                    marginRight: 104,
                    marginLeft: 103,
                    backgroundColor:"#f1f1f1",
                    flexDirection:'row'

                  }}
                >
               
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i
                          className="fas fa-envelope"
                          style={{  color: "rgb(152,152,152)",marginLeft: 15,}}
                        />
                        <input
                          type="text"
                          style={{
                            background: "rgba(255,255,255,0)",
                            borderStyle: "none",
                            marginRight: 10,
                            color: "rgb(152,152,152)",
                            fontFamily: "Raleway, sans-serif",
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft:50,
                            width:300
                          
                          }}
                          placeholder={t("ُEmail")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    
                </div> 
                
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
                 onClick={handleSubmit}
                 disabled={loading}
                 
                >
                  {/* <a
                    href="/firnas_log"
                    style={{ color: "rgb(255,255,255)", fontSize: 18 }}
                  >
                    {t("Login")}
                  </a> */}
                  {t("Reset Password")}
                </button>
                
                <div className="w-100  mt-2">
                   <Link to="/">Login</Link>
                </div>
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


    </div>
  )
}

export default ResetPassword