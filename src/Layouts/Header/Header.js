import React from 'react'
import TranslationButton from '../../Components/TranslationButton/TranslationButton'

function Header({handleDirectionChange,currentUser,logout,user}) {
  return (
    <div className="header-container">

  
    <header className="bg-dark">
    <nav
            className="navbar navbar-expand-md sticky-top py-3 navbar-dark"
            id="mainNav"
            style={{ background: "#025F5F", color: "#00544D" }}
          >
    
            <div className="container">
              <TranslationButton onDirectionChange={handleDirectionChange} />
              <button
                data-bs-toggle="collapse"
                data-bs-target="#navcol-2"
                className="navbar-toggler"
              >
                <span className="visually-hidden">Toggle navigation</span>
                <span className="navbar-toggler-icon" />
              </button>
              <img
                src="assets/img/Screenshot%202023-08-02%20at%204.11.46%20PM.png"
                width={347}
                alt="Toggle option"
                height={129}
              />
              <div
                className="collapse navbar-collapse"
                id="navcol-1"
                style={{
                  borderStyle: "none",
                  color: "rgba(0,84,77,0)",
                  marginRight: "-475px",
                  paddingRight: 170,
                }}
              >
                <button
                  className="btn btn-primary"
                  data-bss-hover-animate="flash"
                  type="button"
                  style={{
                    background: 'url("assets/img/logo.png") no-repeat, #00000000',
                    backgroundSize: "cover, auto",
                    width: 292,
                    height: 102,
                    transform: "perspective(0px)",
                    color: "rgba(0,0,0,0)",
                    marginRight: 23,
                    paddingRight: 0,
                    paddingBottom: 0,
                    marginBottom: 21,
                    borderColor: "#025F5F",
                  }}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    background:
                      'url("assets/img/logo1.png") no-repeat, #00000000',
                    backgroundSize: "cover, auto",
                    width: 341,
                    height: 104,
                    transform: "perspective(0px)",
                    color: "rgba(0,0,0,0)",
                    paddingBottom: 0,
                    marginBottom: 3,
                    marginRight: 12,
                    paddingRight: 0,
                    marginTop: 34,
                    borderColor: "#025F5F",
                  }}
                />
                
              {currentUser ?
              
                <small
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    color: "var(--bs-primary-bg-subtle)",
                    fontSize: 18,
                    marginTop: 120,
                    fontWeight: "bold",
                    marginRight: "-2px",
                    marginLeft: "-8px",
                  }}
                >
                 {user}
                </small> 
                : null
                }
                
              </div>
              <div
                className="collapse navbar-collapse"
                id="navcol-2"
                style={{
                  borderStyle: "none",
                  color: "rgba(0,84,77,0)",
                  marginRight: "-475px",
                  paddingRight: 170,
              
                }}
              />
              {
                currentUser ?
              <button style={{backgroundColor:"#4aa6e8"}} onClick={logout}>
                Logout
              </button>:null
            
              }
              </div>
    
          </nav>
   
  </header>
  </div>
  )
}

export default Header