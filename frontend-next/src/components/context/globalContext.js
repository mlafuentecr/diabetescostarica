import React, { useState, createContext, useEffect } from "react";


//1 Context that use in pages
export const GlobalContext  = createContext();

// 2 PROVIDE the information for GlobalContext
export const GlobalProvider = props =>{

        //Declaro los States
        const [userId, setUserId] = useState('');
        const [lenguage, setLenguage] = useState('en');
        //const [login, setLogin] = useState(false);

        // //
        const state = {
          lenguage: lenguage,
          //login: login,
          userId: userId
        }

        //cuando cargo pagina
        useEffect(() => {
          const lng = localStorage.getItem("lenguage");
          console.log(`getting lenguage from storage----------------------${lng}`)
          if(lng !== '' && lng !== null){setLenguage(lng)}
        }, []);
        
        useEffect(() => {
          localStorage.setItem("lenguage", state.lenguage);
          console.log(`******** localStorage lenguageSelected *********${state.lenguage}`)
        }, [lenguage]);




     


        //Cuando Cmbio lng
        useEffect(() => {
          //console.log(`userId = ${userId}`);
        }, [userId]);


        return (
          <GlobalContext.Provider value={{state, setLenguage, setUserId} } >
              {props.children}
          </GlobalContext.Provider>
        );

}




//
//export const LanguageContext = createContext('en')
