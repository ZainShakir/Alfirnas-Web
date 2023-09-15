import React, { useState } from 'react';
import IntMap from '../Components/intmap/intMap';
import '../Components/TicketForm/TicketStyle.css';
import { useTranslation } from 'react-i18next';
import TicketForm from '../Components/TicketForm/TicketForm';
import '../Components/local/rtl.css';
// import axios from 'axios';
// import Model_form from "../comp/Model_From/model_form";
import Titel from '../Components/Title';
// import { getDownloadURL, uploadBytes, ref, uploadBytesResumable } from "firebase/storage";
// import { addDoc, collection } from "firebase/firestore";
// import { firebaseStorage, firestoreStorage } from "../firebaseConfig/config";
import InferenceForm from '../Components/InferenceForm/InferenceForm';
import { useAuth } from '../Context/AuthContext';
import Header from '../Layouts/Header/Header';

function Alfirnas() {
  const [t, i18n] = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [dire, setDirection] = useState('ltr');
  const { currentUser, logout } = useAuth();
  // const [imgUrl, setImgUrl] = useState(null);
  // const [progresspercent, setProgresspercent] = useState(0);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const file = e.target[0]?.files[0]
  //   if (!file) return;
  //   const storageRef = ref(firebaseStorage, `files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on("state_changed",
  //     (snapshot) => {
  //       const progress =
  //         Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //       setProgresspercent(progress);
  //       console.log(progress)
  //     },
  //     (error) => {
  //       alert(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImgUrl(downloadURL)
  //         addDatatoFirestore(downloadURL)
  //       });
  //     }
  //   );
  // }
  const handleMarkerClick = () => {
    console.log(i18n);
    setShowForm(true);
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  // const addDatatoFirestore = async (url) => {
  //   const date = new Date()
  //   try {
  //     const docRef = await addDoc(collection(firestoreStorage, "files"), {
  //       timeStamp: date,
  //       url: url
  //     });

  //     console.log("Document written with ID: ", docRef.id);

  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  return (
    <div className="bg-white h-screen overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-[#025F5F] scrollbar-thumb-rounded-xl">
      <Titel />
      <Header
        handleDirectionChange={handleDirectionChange}
        currentUser={currentUser}
        logout={logout}
        user={'Firnas Aero'}
      />

      <div style={{ direction: dire, marginTop: 20 }}>
        <InferenceForm />
        <section className="py-5" style={{ background: '#ffffff' }}>
          {/* <section
                className="py-4 py-xl-5"
                style={{ marginBottom: "-29px", marginTop: "-78px" }}
              >
                <section
                  className="py-4 py-xl-5"
                  style={{ marginBottom: "-29px", marginTop: "-78px" }}
                />
                <div
                  className="container"
                  style={{ borderBottomColor: "var(--bs-secondary)" }}
                >
                  <div
                    className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                    style={{
                      height: "170.398px",
                      width: 1296,
                      color: "#327777",
                      border: "13px double var(--bs-secondary)"
                    }}
                  >
                    <div
                      className="pb-2 pb-lg-1"
                      style={{ borderStyle: "solid", borderBottomStyle: "none" }}
                    >
                      <h2
                        className="fw-bold mb-2"
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontSize: 30,
                          color: "#327777",
                          borderColor: "var(--bs-secondary)",
                          fontWeight: "bold"
                        }}
                      >
                        <strong style={{ alignSelf: "right" }} >{t("Upload_image")}</strong>
                      </h2>
                      <p
                        className="mb-0"
                        style={{
                          fontFamily: "Raleway, sans-serif",
                          fontSize: 24,
                          color: "#327777",
                          borderColor: "var(--bs-secondary)",
                          fontWeight: "bold",
                          direction: 'rtl'
                        }}
                      >
                        {t("Upload_image_dec")}
                      </p>
                    </div>
                  </div>
                </div>
              </section> */}
          {/* <div className="container">
                <div className="files color form-group mb-3">
                  <form onSubmit={handleSubmit} className='form'>
                    <input
                      type="file"
                      multiple=""
                      name="files"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        background: "rgb(255,255,255)",
                        borderColor: "var(--bs-primary)",
                        marginBottom: "-13px",
                        fontWeight: "bold"
                      }}
                    />
                    <button type='submit'>Upload</button>
                  </form>
                </div>
              </div> */}
          <section className="py-4 py-xl-5">
            <div className="container">
              <div
                className="text-white bg-primary border rounded border-0 border-primary d-flex flex-column justify-content-between flex-lg-row p-4 p-md-5"
                style={{
                  paddingBottom: 23,
                  marginBottom: '-13px',
                  marginTop: '-1px',
                }}
              >
                <div
                  className="pb-2 pb-lg-1"
                  style={{ marginRight: 0, paddingRight: 0 }}
                >
                  <h2
                    className="fw-bold mb-2"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: 30,
                      color: '#327777',
                      fontWeight: 'bold',
                    }}
                  >
                    {t('Interactive_map')}
                  </h2>
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: 'Raleway, sans-serif',
                      color: '#327777',
                      fontWeight: 'bold',
                      fontSize: 24,
                    }}
                  >
                    {t('Interactive_map_dec_firnas')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <IntMap onMarkerClick={handleMarkerClick} alfirnas={true} />
            </div>
            {showForm && (
              <div style={{ flex: 1 }}>
                <TicketForm />
              </div>
            )}
          </div>

          <footer className="text-center">
            <div className="container text-muted py-4 py-lg-5">
              <p className="mb-0" style={{ fontFamily: 'Raleway, sans-serif' }}>
                Firnas Aero © 2023
              </p>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Alfirnas;
