import React, { useContext, useEffect, useState, useRef } from 'react'
import { GlobalContext } from '../components/context/globalContext'


const Loging = (props) => {

  //look for language choosen in useContext
  const {setUserId } = useContext(GlobalContext)
  const language = props.lenguage;
  const [user, setUser] = useState('')
  const [userHolder, setUserholder] = useState('Account')
  const [passWord, setpassWord] = useState('')
  const [passPlaceholder, setpassPlaceholder] = useState('Password')
  const [submitHolder, setSubmitHolder] = useState('Submit')
  const [remember, setRemember] = useState(false)
  const [firstTime, setfirstTime] = useState(false)

  /*this is defaulth but also line 179 */
  const [rememberTxt, setRememberTxt] = useState('Remember me')
  const [forgotTxt, setForgotTxt] = useState('Forgot your login info?')
  const [termsTxt, setTermsTxt] = useState(`By logging in you agree to <span>our terms and conditions</span>`)
  const [linkTerms, setLinkTerms] = useState(`/general-rules-and-policies-en/`)

  const inputPassRef  = useRef(null);
  const inputUsersRef = useRef(null);
 

 
  //When Submit Form
  function handleSubmit(event){
    event.preventDefault()
    //Set cookies
    setLoginAttemptCookie();
    
    //1CHECK FORM BEFORE SENT
    const data = new FormData(event.target);
    if(!user || !passWord ){
       //1 checkdata is not empty
      alert('You must fill in the username and password in order to login')
    }else{
     
      //carga loading spinner from layoutindex
      props.loadingAction()
      //2 SET INFO TO SEND
      data.set('username', user);
      data.set('password', passWord);
      sendForm(data)
    }
  
  }
 
 
  function sendForm() {
    //console.log('A form was submitted: ');
    const form = document.getElementsByTagName('form')[0];
    form.submit();
}

  
  
 
useEffect(() => {
  //No hay usuario revisar si lo tengo en memoria
  if( inputUsersRef.current.value ===''){
    getUserInfo();
  }
  if(firstTime){

    //console.log(`-------------removeUserInfo   ${remember} `);
   
          //Salvar usuario si esta check y si hay nombre y pass
          if(remember && inputUsersRef.current.value !=='' && inputPassRef.current.value !==''){
            saveUserInfo();
          }

          //buscar el check en memoria si lo tiene vuelvalo a marcar
          if(localStorage.getItem('remember') === true && !remember){
            setRemember(true)
          }
          
          if(remember === false){
            removeUserInfo();
          }
  }
 
  
}, [remember])





function getUserInfo(){

  //console.log(`4 getUserInfo ************************`);

  let userTmp         = localStorage.getItem('user')
  let passwordTmp     = localStorage.getItem('password')
  let rememberTmp     = localStorage.getItem('remember')

  //console.log(`-user ${userTmp}  password ${passwordTmp} checkRemember ${rememberTmp}`);
  
  if(userTmp){
    setUserId(userTmp)
    //le digo al useRef que le ponga el valor
    inputUsersRef.current.value=userTmp 
    inputPassRef.current.value=passwordTmp
    setRemember(rememberTmp)
    //console.log(`${remember} llenando la info ${inputUsersRef.current.value}`)
  }

  setfirstTime(true)
  //Si encuentro Usuario ponerlo

 
}




function saveUserInfo(){
 

      if(inputUsersRef.current.value !== ''){
        //console.log(`*************remember is check saveUserInfo ${inputUsersRef.current.value} `)
        //Set placeholder
            //Save data in localStorage
        localStorage.setItem('user', inputUsersRef.current.value)
        localStorage.setItem('password', inputPassRef.current.value)
        localStorage.setItem('remember', remember)
      }
      else{
        //console.log(`No data save until user put id ${inputUsersRef.current.value} `)
      }
     
  }



function removeUserInfo(){
  //console.log(`borrando`);
    // Clear all items if not ckeck
    //setRemember(false)

    
    inputUsersRef.current.value = ''
    inputPassRef.current.value =""
    // setUserholder('Account')
    // setpassPlaceholder('Password')

    // setUserId('')
    // setUser('')
    // setpassWord('')
    localStorage.removeItem('user')
    localStorage.removeItem('password')
    
}


function setLoginAttemptCookie() {

  var date = new Date();
  date.setTime(date.getTime() + (3 * 60 * 1000));
  var cookie =  `loginInfo=username%3D${user}%26password%3D${passWord}%26rememberme%3D${remember}; expires=${date}; SameSite=None; path=/`; 
  document.cookie = cookie;

}

  
//If language change save it
useEffect(() => {
 
  switch(language) {
    
    case 'vi':
      setRememberTxt('Lưu lại')
      setForgotTxt('Quên mật khẩu?')
      setTermsTxt('Khi đăng nhập, bạn đồng ý cái điều kiện')
      setpassPlaceholder('Mật khẩu')
      setUserholder('Tài khoản')
      setSubmitHolder(`Đăng nhập`)
      setLinkTerms('/general-rules-and-policies-vi/')
      break;

    case 'zh':
      setRememberTxt('記得我嗎')
      setForgotTxt('忘記您的登錄信息？')
      setTermsTxt('登錄后即表示您同意條款和條件')
      setpassPlaceholder('密碼')
      setUserholder('賬號')
      setSubmitHolder(`提交`)
      setLinkTerms('/general-rules-and-policies-zh/')
      break;

    default:
      setRememberTxt('Remember me')
      setForgotTxt('Forgot your login info?')
      setTermsTxt('By logging in you agree to <span>our terms and conditions</span>') 
      //By logging in you agree to <span>our terms and conditions</span>
      setpassPlaceholder('Password')
      setUserholder('Account')
      setSubmitHolder(`Submit`)
      setLinkTerms('/general-rules-and-policies-en/')
  }


}, [language])




  return (
    <div className={`login ${props.classvar}`}>
      <form
        id="loginForm"
        className="form loginBox lngViet"
        method="POST" 
        action="https://wager.vietbet.eu/LoginVerify.asp"
        onSubmit={handleSubmit}
      >
  
        <div className="form-group">
          <input id="customerid" name="customerid" type="hidden" />
          <input
            type="text"
            name="username"
            id="username"
            ref={inputUsersRef}
            className="form-control"
            required 
            placeholder={userHolder}
            onChange={e => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
          type="password"
          name="password"
          id="password"
          ref={inputPassRef}
            className="form-control"
            required 
            placeholder= {passPlaceholder}
            onChange={e => setpassWord(e.target.value)}
          />
        </div>
        <div className="form-group btnLogin">
          <button
            id="do-login"
            className="btn btn-outline-primary"
            type="submit"
          >
            {submitHolder}
          </button>
        </div>

        <div className="form-groupFix">
          <div className="form-remember">
            <div className="box">
              <input
                id="rememberme"
                name="rememberme"
                type="checkbox"
                checked={JSON.parse(remember)}
                onChange={e => setRemember(!remember)}
              />
              <label>{rememberTxt} </label>
            </div>
            <div className="div">|</div>
            <div className="box">
              <a href="https://wager.vietbet.eu/password-recovery/">
                {forgotTxt}
              </a>
            </div>
            <div className="div">|</div>
          </div>
          <hr />
          <a className="terms" href={linkTerms}>
            <div dangerouslySetInnerHTML={{ __html: termsTxt }} />
          </a>
        </div>
      </form>
    </div>
  )
}

export default Loging
