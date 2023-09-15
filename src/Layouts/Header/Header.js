import React from "react";
import TranslationButton from "../../Components/TranslationButton/TranslationButton";

function Header({ handleDirectionChange, currentUser, logout, user }) {
  return (
    <div
      className="flex px-4 py-4 justify-between"
      style={{ backgroundColor: "#025F5F" }}
    >
      <div className="flex w-20 h-28 justify-center  items-center ">
        <TranslationButton onDirectionChange={handleDirectionChange} />
      </div>
      <div className="flex w-70 h-30 justify-center ">
        <div>
          <img
            src="assets/img/logo.png"
            width={292}
            alt="Toggle option"
            height={102}
          />
        </div>
        <div className="">
          <img
            src="assets/img/logo1.png"
            width={341}
            alt="Toggle opt"
            height={104}
          />
        </div>
      </div>
      <div className="flex flex-col w-28 h-27 justify-center  items-center">
        {currentUser ? (
          <small
            style={{
              fontFamily: "Raleway, sans-serif",
              color: "var(--bs-primary-bg-subtle)",
              fontSize: 18,
              fontWeight: "bold",
              marginRight: "-2px",
              marginLeft: "-8px",
            }}
          >
            {user}
          </small>
        ) : null}
        {currentUser ? (
          <button style={{ backgroundColor: "#4aa6e8" }} onClick={logout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
