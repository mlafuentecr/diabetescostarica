import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../components/context/globalContext'

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
} from 'react-icons/fa'
import LanguageForm from './LanguageForm'
import { MdEmail } from 'react-icons/md'
import Loadable from 'react-loadable'




const Footer = props => {
  const { state } = useContext(GlobalContext)
  const [footerInfo, setFooterInfo] = useState(null)
  const [footerLinks, setFooterLinks] = useState(null)
  const [phoneprincipal, setPhoneprincipal]= useState(null)

  function OpenAccount() {
    if (props.signUp !== false) {
      return (
        <div
          className="openAccount"
          tabIndex={0}
          role="button"
          onClick={() => {
            document.location.href = props.openAccount
          }}
        >
          {footerInfo.openAccountText}
        </div>
      )
    }
    return false
  }
  useEffect(() => {
    switch (state.lenguage) {
      case 'vi':
        setFooterInfo(props.contactInfo.vi)
        setFooterLinks(props.footerLinks[1])
        break

      case 'zh':
        setFooterInfo(props.contactInfo.zh)
        setFooterLinks(props.footerLinks[2])
        break

      default:
        setFooterInfo(props.contactInfo.en)
        setFooterLinks(props.footerLinks[0])
        break
    }
  }, state.lenguage)

  //Get icons
  const allSocial = () => {
    if (props.social.length > 0) {
      return props.social.map((item, index) => {
        let icon = item.icon
        let link = item.link
        //console.log(`link ${link}`);
        switch (icon) {
          case 'FaFacebookSquare':
            return (
              <FaFacebookF
                key={index}
                tabIndex={1}
                onClick={() => {
                  window.open(link)
                }}
              />
            )
          case 'FaTwitterSquare':
            return (
              <FaTwitter
                key={index}
                tabIndex={2}
                onClick={() => {
                  window.open(link)
                }}
              />
            )
          case 'FaInstagramSquare':
            return (
              <FaInstagram
                key={index}
                tabIndex={3}
                onClick={() => {
                  window.open(link)
                }}
              />
            )
          case 'GrYoutube':
            return (
              <FaYoutube
                key={index}
                tabIndex={4}
                onClick={() => {
                  window.open(link)
                }}
              />
            )
          default:
            return ''
        }
      })
    }
    return false
  }




  
  

  const  numberColored = props => {
   
    const numbers = phoneprincipal.split('-', 4)
    const coloredNum = `<a class="principal" href="tel:${phoneprincipal}">
    ${numbers[0]}- <span class='yellow'>${numbers[1]}</span>-${numbers[2]}-${numbers[3]}
    </a>`

    //I think this resolve the problem number sometimes dont load
    if (coloredNum === '') {
      console.log('coloredNum is null')
      setTimeout(numberColored, 1000)
      return phoneprincipal
    } else {
      return coloredNum
    }

  }

useEffect(() => {
  if(document.getElementById('principal') !== null && phoneprincipal !== null){
    document.getElementById('principal').innerHTML = numberColored()
  }
  })

  const LoadableLiveChat = Loadable({
    loader: () => import('react-livechat'),
    loading: () => '',
  })

  const ContactIcons = props => {
    return (
      <>
        {/* {allSocial} */}
        <MdEmail
          className={props.classN}
          role="button"
          tabIndex={8}
          onClick={() => {
            document.location.href = `mailto:${footerInfo.email}`
          }}
        />
        <FaPhone
          className={props.classN}
          role="button"
          tabIndex={9}
          onClick={() => {
            document.location.href = 'tel:' + footerInfo.phonePrincipal
          }}
        />
      </>
    )
  }




  
  const ContactwithNumber = props => {
    setPhoneprincipal(footerInfo.phonePrincipal)
    
    return (
      <>
        <div className="contact desktop">
          <a
            id="principal"
            className="principal"
            href={`tel:${footerInfo.phonePrincipal}`}
          >
            {footerInfo.phonePrincipal}
          </a>
          <div className="numbers">
            <a href={`tel:${footerInfo.phone2}`}>{footerInfo.phone2} </a>
            <a href={`tel:${footerInfo.phone3}`}>{footerInfo.phone3}</a>
          </div>

          <a className="email" href={`mailto:${footerInfo.email}`}>
            {footerInfo.email}
          </a>
        </div>
      </>
    )
  }

  if (footerInfo) {
    return (
      <>
   
        <footer style={{ background: `${props.footerColor}` }}>
          <div className="container footerBtns">
            <LoadableLiveChat license={8867594} />

            {/*mobile*/}
            <OpenAccount />

            <div className="social mobile" >
              <ContactIcons classN="mobile" />
            </div>

            {/*Desktop*/}
            <div
              className="social desktop"
              style={{ background: `${props.footerColor}` }}
            >
              <div className="accountSocial">
                <ContactwithNumber  footerInfo={footerInfo}/>
              </div>
            </div>
          </div>
          <div className="copyrighs">
            <div className="container">
              <div className="txt">
                <div
                  className="txtLinks"
                  dangerouslySetInnerHTML={{ __html: footerLinks }}
                />
              </div>
              <div className="txt">
                <LanguageForm className=" desktop" />{' '}
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }
  return ''
}

export default Footer
