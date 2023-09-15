import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Titel from "../Components/Title";
//  import { app } from "../Config/Config";
import "firebase/auth";
// import { db } from '../Config/Config';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../Layouts/Header/Header";
import { useAuth } from "../Context/AuthContext";
import { Alert } from "react-bootstrap";

const Login = (props) => {
  const [t, i18n] = useTranslation();
  const [searchparams] = useSearchParams();
  console.log(searchparams.get("type"));

  const [showPassword, setShowPassword] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  const [dire, setDirection] = useState("ltr");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //const auth = getAuth(app);

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    console.log(dire, i18n);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleMarkerClick = () => {
  //   setShowForm(true);
  // };

  // const handleLogin = async (e) => {

  // try {
  //   const userCredential = await signInWithEmailAndPassword(auth, email, password);

  //   const user = userCredential.user;
  //  if(user.displayName ==='jumanhAdmin')
  //  {
  //   navigate('/firnas_log');
  //  }else
  //  {
  //   navigate('/med_log')
  //  }

  // } catch (error) {
  //   alert(error.message);
  //   console.error('Error logging in:', error.message);
  // }
  //};

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Titel />
      <Header handleDirectionChange={handleDirectionChange} />

      <section
        className="py-4 py-xl-5"
        style={{ background: "#ffffff", paddingTop: 43, marginTop: 39 }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
            <div
              className="row g-0"
              style={{
                background: "#ffffff",
                border: "6px solid rgb(3,94,95,0.5)",

                justifyContent: "center",
              }}
            >
              <div
                className="col-md-6 col-xxl-6 order-first order-md-last"
                style={{
                  minHeight: 250,
                  paddingTop: 12,
                  marginTop: 75,
                  minWidth: 5,
                }}
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
                      {t("MemLog")}
                    </span>
                  </strong>
                  <div>{error && <Alert variant="danger">{error}</Alert>}</div>
                </p>
                <div
                  style={{
                    background: "#f1f1f1",
                    borderRadius: 25,
                    padding: 7,
                    // textAlign: "left",
                    marginRight: 104,
                    marginLeft: 103,
                    backgroundColor: "#f1f1f1",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i
                      className="fas fa-envelope"
                      style={{ color: "rgb(152,152,152)", marginLeft: 15 }}
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
                        marginLeft: 50,
                        width: 300,
                      }}
                      placeholder={t("ُEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "#f1f1f1",
                    borderRadius: 25,
                    padding: 7,
                    marginTop: 15,
                    // textAlign: "left",
                    marginRight: 104,
                    marginLeft: 103,
                    backgroundColor: "#f1f1f1",
                    fontSize: 18,
                    flexDirection: "row",
                    fontWeight: "bold",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i
                      className="fas fa-lock"
                      style={{
                        marginLeft: 15,
                        color: "rgb(152,152,152)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      style={{
                        background: "rgba(255,255,255,0)",
                        borderStyle: "none",
                        marginLeft: 50,
                        color: "rgb(152,152,152)",
                        fontSize: 18,
                        fontWeight: "bold",
                        flex: 1,
                      }}
                      placeholder={t("Password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      onClick={togglePasswordVisibility}
                      className={
                        showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                      style={{
                        position: "absolute",
                        right: 15,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "rgb(152,152,152)",
                      }}
                    />
                  </div>
                </div>
                <div>
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
                    onClick={() => navigate("/Usertype")}
                  >
                    {/* <a
                    href="/firnas_log"
                    style={{ color: "rgb(255,255,255)", fontSize: 18 }}
                  >
                    {t("Login")}
                  </a> */}
                    {t("Gobak")}
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
                    disabled={loading}
                    onClick={handleLogin}
                  >
                    {/* <a
                    href="/firnas_log"
                    style={{ color: "rgb(255,255,255)", fontSize: 18 }}
                  >
                    {t("Login")}
                  </a> */}
                    {t("Login")}
                  </button>
                </div>

                {searchparams.get("type") === "Madinah" && (
                  <div className="w-100 mt-2">
                    Reset Password? <Link to="/ResetPassword">Click Here</Link>
                  </div>
                )}
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
  );
};

export default Login;
