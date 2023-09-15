import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Layouts/Header/Header';
import Titel from '../Components/Title';
import { useTranslation } from 'react-i18next';

function UserType() {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="bg-white" style={{ minHeight: 'calc(100vh)' }}>
      <Titel />
      <Header />

      <section className="py-4 py-xl-5 bg-white">
        <div className="container text-center">
          <div className="bg-white flex justify-center border-[6px] border-[rgb(3,94,95,0.5)] py-[100px] px-3">
            <div>
              <p
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  color: 'rgb(3,94,95)',
                  fontFamily: 'Raleway, sans-serif',
                  textAlign: 'center',
                }}
              >
                <strong>
                  <span style={{ color: 'rgb(50, 119, 119)' }}>
                    {t('MemOption')}
                  </span>
                </strong>
              </p>
              <div className="mt-3 flex flex-col sm:flex-row  gap-3 justify-center items-center">
                <button
                  className="mybtn"
                  onClick={() =>
                    navigate({
                      pathname: '/Login',
                      search: createSearchParams({
                        type: 'Alfirnas',
                      }).toString(),
                    })
                  }
                >
                  Login As Firnas User
                </button>

                <button
                  className="mybtn"
                  onClick={() =>
                    navigate({
                      pathname: '/Login',
                      search: createSearchParams({
                        type: 'Madinah',
                      }).toString(),
                    })
                  }
                >
                  Login As Madinah User
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-muted py-4 py-lg-5">
          <p
            className="mb-0"
            style={{ textAlign: 'center', fontFamily: 'Raleway, sans-serif' }}
          >
            Firnas Aero © 2023
          </p>
        </div>
      </section>
    </div>
  );
}

export default UserType;
