import React, { useEffect, useState } from "react";
import IntMap from "../Components/intmap/intMap";
import Iframe from "react-iframe";
import "../Components/TicketForm/TicketStyle.css";
import "../Components/local/rtl.css";
import Titel from "../Components/Title";
import Header from "../Layouts/Header/Header";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
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
  const [csvArray, setCsvArray] = useState([]);
  const [data, setData] = useState([]);
  const handleDirectionChange = (newDirection) => {
    console.log(i18n);
    setDirection(newDirection);
  };
  const headers = [
    { label: "Ticket", key: "Ticket" },
    { label: "callername", key: "callername" },
    { label: "Date", key: "Date" },
    { label: "subsublocationname", key: "subsublocationname" },
    { label: "subsubclassificationname", key: "subsubclassificationname" },
    { label: "category", key: "category" },
    { label: "longitude", key: "longitude" },
    { label: "latitude", key: "latitude" },
    { label: "Department", key: "Department" },
    { label: "Status", key: "Status" },
  ];

  const getData = async () => {
    dataref.ref(`Sheet3`).on("value", (snapshot) => {
      let responselist = snapshot.val();
      const flattenedArray = Object.entries(responselist).map(
        ([key, value]) => ({ ...value })
      );
      setData(flattenedArray);
    });
  };
  const getExcelData = async () => {
    dataref.ref(`Sheet3`).on("value", (snapshot) => {
      let responselist = snapshot.val();
      const flattenedArray = Object.entries(responselist).map(
        ([key, value]) => ({ ...value })
      );
      setCsvArray(flattenedArray);
    });
  };

  useEffect(() => {
    getExcelData();
  }, []);

  return (
    <div className="bg-white h-screen overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-[#025F5F] scrollbar-thumb-rounded-xl">
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

          <div className="container">
            <IntMap />
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

          <div className="container">
            <Iframe
              title="Report Section"
              // width="1300"
              // height="900"
              src="https://app.powerbi.com/view?r=eyJrIjoiMDI1M2E4YTQtYTRhNC00MDhhLTk4YmItZmI4ODAwODE2ZGI5IiwidCI6ImI0NTNkOTFiLTZhYzEtNGI2MS1iOGI4LTVlNjVlNDIyMjMzZiIsImMiOjl9"
              frameborder="0"
              allowFullScreen="true"
              id="myId"
              className="myClassname w-full h-screen"
            />
          </div>

          <div className="container mt-5">
            <div className="mb-3" style={{ flexDirection: "row" }}>
              <button className="bttn__primary" onClick={() => getData()}>
                Display Data
              </button>
              <CSVLink data={csvArray} headers={headers} separator={";"}>
                <button className="bttn__primary" style={{ marginLeft: 20 }}>
                  Download Excel
                </button>
              </CSVLink>
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
    </div>
  );
}

export default MedLog;
