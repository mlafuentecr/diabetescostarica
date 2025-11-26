import React, { useContext,  useState, useEffect} from 'react'
import {  FaGlobe } from 'react-icons/fa';
import { GlobalContext }  from "../components/context/globalContext"

const LanguageForm =(props)=> {
  const [lngOpen, setLngOpen] = useState(false);
  const {state, setLenguage} = useContext(GlobalContext);
  const [lngTxt, setlngTxt] = useState('LANGUAGE');
 

  //LENGUAGE
  const handleInpLenguageChange = () => {
      //Si change de lng y no estoy en index redirect window.location.href = '/'
      if(window.location.pathname !== `/`){
        window.location.href = `/`
      }
  
  }

 

 const langTitle=()=>{
  if(state.lenguage === 'en'){return 'Language'}
  if(state.lenguage === 'vi'){return 'NGÔN NGỮ'}
  if(state.lenguage === 'zh'){return '語言'}
 }

  const FormLenguage =()=>{


      if(props.actionType === 'click'){
      return <div className={`formLan ${lngOpen ? "openLng" : ""}`}>
              <div className="lng" role = "button" onClick={()=>setLngOpen(!lngOpen)}> <FaGlobe  /> {langTitle()} </div>
                <div className={'lngWrap'}>
                  <div  role = "button" onClick={()=>{setLenguage('en'); setLngOpen(false); handleInpLenguageChange()}} >English</div>
                  <div  role = "button" onClick={()=>{setLenguage('vi'); setLngOpen(false); handleInpLenguageChange()}} >Tiếng Việt</div>
                  <div  role = "button" onClick={()=>{setLenguage('zh'); setLngOpen(false); handleInpLenguageChange()}} >中文</div>
                </div>
            </div>
      }else{
        return <div className={`formLan openLng autoHide`}>
              <div className="lng" role = "button" > <FaGlobe  /> {langTitle()}</div>
                <div className={'lngWrap'}>
                <div  role = "button" onClick={()=>{setLenguage('en'); setLngOpen(false); handleInpLenguageChange()}} >English</div>
                  <div  role = "button" onClick={()=>{setLenguage('vi'); setLngOpen(false); handleInpLenguageChange()}} >Tiếng Việt</div>
                  <div  role = "button" onClick={()=>{setLenguage('zh'); setLngOpen(false); handleInpLenguageChange()}} >中文</div>
                </div>
            </div>
      }
    }

    

    return <FormLenguage className="lng"/>
    
 
}


export default LanguageForm; 