import React, { useContext, useState } from "react"
import {  FaGlobe } from 'react-icons/fa';
import { GlobalContext }  from "../components/context/globalContext"

const LanguageForm =(props)=> {
  const [lngOpen, setLngOpen] = useState(false);
  const {state, setLenguage} = useContext(GlobalContext);


  //LENGUAGE
  const handleInpLenguageChange = () => {
      //Si change de lng y no estoy en index redirect window.location.href = '/'
      if(window.location.pathname !== `/`){
        window.location.assign(`/`)
      }

  }

 

 const langTitle=()=>{
  if(state.lenguage === 'en'){return 'Language'}
  if(state.lenguage === 'vi'){return 'NGÔN NGỮ'}
  if(state.lenguage === 'zh'){return '語言'}
 }

  const wrapperClass = props.actionType === 'click'
    ? `formLan ${lngOpen ? "openLng" : ""}`
    : "formLan openLng autoHide"

  const toggleOpen = props.actionType === 'click' ? () => setLngOpen(!lngOpen) : undefined

  return (
    <div className={wrapperClass}>
      <div className="lng" role="button" onClick={toggleOpen}>
        <FaGlobe /> {langTitle()}
      </div>
      <div className={'lngWrap'}>
        <div role="button" onClick={()=>{setLenguage('en'); setLngOpen(false); handleInpLenguageChange()}} >English</div>
        <div role="button" onClick={()=>{setLenguage('vi'); setLngOpen(false); handleInpLenguageChange()}} >Tiếng Việt</div>
        <div role="button" onClick={()=>{setLenguage('zh'); setLngOpen(false); handleInpLenguageChange()}} >中文</div>
      </div>
    </div>
  )


}


export default LanguageForm; 