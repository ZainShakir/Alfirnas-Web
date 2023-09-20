import React from 'react';
import TranslationButton from '../../Components/TranslationButton/TranslationButton';
import logo from '../../assets/images/logo.png';
import logo1 from '../../assets/images/logo1.png';

function Header({ handleDirectionChange, currentUser, logout, user }) {
  return (
    <div className="bg-[#025F5F] text-[#00544D] py-5 z-[100]">
      <div className="container h-full  flex flex-col sm:flex-row justify-between items-center">
        <TranslationButton onDirectionChange={handleDirectionChange} />
        <div className="flex justify-center items-center my-4 sm:my-0">
          <img
            className="md:w-[292px] md:h-[102px] w-[100px] h-auto"
            src={logo}
            alt="logo"
          />
          <img
            className="relative md:top-[10px] top-[5px] md:w-[341px] md:h-[104px] w-[130px] h-auto"
            src={logo1}
            alt="logo1"
          />
        </div>
        <div className="flex flex-col justify-center items-end">
          {currentUser ? (
            <small
              style={{
                fontFamily: 'Raleway, sans-serif',
                color: 'var(--bs-primary-bg-subtle)',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {user}
            </small>
          ) : null}
          {currentUser ? (
            <button className="bg-[#4aa6e8] ml-3" onClick={logout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
