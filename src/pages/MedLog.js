import React, { useState } from "react";
import IntMap from "../Components/intmap/intMap";
import Iframe from "react-iframe";
import "../Components/TicketForm/TicketStyle.css";
import "../Components/local/rtl.css";
import Titel from "../Components/Title";
import Header from "../Layouts/Header/Header";
import { useTranslation } from "react-i18next";
import "./med_log.css";
import { dataref, firebaseStorage } from "../Config/Config";
import DataTable from "../Components/DataTable/DataTable";
import { ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

function MedLog() {
  const [t, i18n] = useTranslation();
  // const [showForm, setShowForm] = useState(false);
  const { currentUser, logout } = useAuth();
  const [dire, setDirection] = useState("ltr");
  const [data, setData] = useState([]);
  const handleDirectionChange = (newDirection) => {
    console.log(i18n);
    setDirection(newDirection);
  };

  const getData = async () => {
    dataref.ref(`Sheet3`).on("value", (snapshot) => {
      let responselist = snapshot.val();
      setData(responselist);
      console.log(responselist);
    });
  };

  async function handleDownload() {
    try {
      // Replace 'your-file-path' with the actual path to the file in Firebase Storage
      console.log("Called");
      const fileRef = ref(
        firebaseStorage,
        "/TotalData/IncidentDetailsReport-Firna_s.xlsx"
      );

      // Get the download URL of the file
      const downloadURL = await getDownloadURL(fileRef);

      // Create a link and trigger a click to start the download
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "IncidentDetailsReport-Firna_s.xlsx"; // Set the desired file name
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <div>
      <Titel />
      <Header
        handleDirectionChange={handleDirectionChange}
        currentUser={currentUser}
        logout={logout}
        user={"AlMadinah"}
      />
      <div style={{ direction: dire }}>
        <section className="py-5" style={{ background: "#ffffff" }}>
          <section
            className="py-4 py-xl-5"
            style={{ marginBottom: "-29px", marginTop: "-78px" }}
          />
          <section
            className="py-4 py-xl-5"
            style={{ marginBottom: "-33px", marginTop: "-75px" }}
          >
            <div className="container">
              <div
                className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                style={{
                  paddingBottom: 23,
                  marginBottom: "-13px",
                  marginTop: 31,
                }}
              >
                <div
                  className="pb-2 pb-lg-1"
                  style={{ marginRight: 0, paddingRight: 0 }}
                >
                  <h2
                    className="fw-bold mb-2"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      fontSize: 30,
                      color: "#327777",
                    }}
                  >
                    <strong>{t("Interactive_map")}</strong>
                  </h2>
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      color: "#327777",
                      fontSize: 24,
                    }}
                  >
                    <strong>{t("Interactive_map_dec_med")}</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* <h1
        style={{
          fontFamily: "Raleway, sans-serif",
          fontSize: 35
        }}
      /> */}

          <div>
            <div>
              <IntMap />
            </div>
          </div>

          <footer>
            <div className="container text-muted py-4 py-lg-5">
              <div
                className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                style={{
                  paddingBottom: 23,
                  marginBottom: "-13px",
                  marginTop: "-34px",
                }}
              >
                <div
                  className="pb-2 pb-lg-1"
                  style={{ marginRight: 0, paddingRight: 0 }}
                >
                  <p
                    className="bold mb-0"
                    style={{
                      fontFamily: "Raleway, sans-srif",
                      fontSize: 30,
                      color: "#327777",
                    }}
                  >
                    <strong>{t("Dashboard")}</strong>
                  </p>
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Raleway, sans-serif",
                      color: "#327777",
                      fontSize: 24,
                    }}
                  >
                    <strong>{t("Dashboard_dec")}</strong>
                  </p>
                </div>
              </div>
            </div>
          </footer>

          <div className="container" style={{ width: "100%", height: "900px" }}>
            <p
              className="mb-0"
              style={{ fontFamily: "Raleway, sans-serif" }}
            ></p>

            <Iframe
              title="Report Section"
              width="1300"
              height="900"
              src="https://app.powerbi.com/view?r=eyJrIjoiMDI1M2E4YTQtYTRhNC00MDhhLTk4YmItZmI4ODAwODE2ZGI5IiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9"
              frameborder="0"
              allowFullScreen="true"
              id="myId"
              className="myClassname"
            />
          </div>
          <div className="container" style={{ marginTop: 20 }}>
            <div style={{ flexDirection: "row" }}>
              <button className="bttn__primary" onClick={() => getData()}>
                Display Data
              </button>
              <button
                className="bttn__primary"
                style={{ marginLeft: 20 }}
                onClick={() => handleDownload()}
              >
                Download Excel
              </button>
            </div>
            {data.length !== 0 ? <DataTable data={data} /> : null}
          </div>
          <footer className="text-center">
            <div className="container text-muted py-4 py-lg-5">
              <p className="mb-0" style={{ fontFamily: "Raleway, sans-serif" }}>
                Firnas Aero © 2023
              </p>
            </div>
          </footer>
        </section>
      </div>

      <section />
      <section />
    </div>
  );
}

export default MedLog;
