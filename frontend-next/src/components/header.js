import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext }  from "../components/context/globalContext"
import { Link } from "gatsby"
import Login from "./login"
import Menu from "./menu"

//dont remove
import globalCss from "./styles/global.css"

const Header = (props) => {
  //look for language choosen in useContext
  const {state} = useContext(GlobalContext)
  const [showNav, setshowNav] = useState(false);
  
  useEffect(() => {
        const pageWrapper = document.querySelectorAll('.wrapper')
    if(showNav){
      //console.log(`open`);
      pageWrapper[0].classList.add('drawOpen')
    }else{
      //console.log(`draw close`);
      pageWrapper[0].classList.remove('drawOpen')
    }
      }, [showNav])

      useEffect(() => {
        console.log(`test lng header ${state.lenguage}`);
      }, [state.lenguage])
  return (
    <>
    <div   name="header" /*id ="header" */ style={{background: `${props.headerColor}`}} className={`header`} > 
      <div className="container">
         <Link to={`/`} className="logo " >
        <img src={props.logoUrl} alt={props.logoAlt}  />
        </Link> 
        <Login lenguage={state.lenguage} loadingAction={props.loadingAction} classvar={" login__header"}/>
        <div className="menuIcon" role = "button" onClick={() => setshowNav(!showNav)}>
        <div />
        <div />
        <div />
      </div>

      </div>
    </div >
 <Menu  lenguage={state.lenguage}  mainMenuColor={props.mainMenuColor} siteUrl={props.siteUrl}/> 
 </>
  )
}



export default Header
