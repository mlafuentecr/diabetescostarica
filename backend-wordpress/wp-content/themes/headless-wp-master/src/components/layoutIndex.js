import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GlobalProvider } from '../components/context/globalContext'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  isPushNotificationSupported,
  sendNotification,
  initializePushNotifications,
} from '../utils/notification/notification'

import SEO from '../components/seo'
import Login from './login'
import Header from './header'
import Footer from './footer'
import SliderIndex from '../components/SliderIndex'

const LayoutIndex = props => {
  const queryGlobal = useStaticQuery(graphql`
  {
    WP_1 {
      vbsettingBy(id: "dmJzZXR0aW5nczo3Nzc=") {
        id
        acf_settings {
          openAccountUrl
          mainColors
          secondColor
          headerColor
          footerColor
          siteLogo {
            altText
            sourceUrl
          }
          contactInfoEn {
            email
            openAccount
            openAccountText
            phone2
            phone3
            phonePrincipal
          }
          contactInfoVi {
            email
            openAccount
            openAccountText
            phone2
            phone3
            phonePrincipal
          }
          contactInfoZh {
            email
            openAccount
            openAccountText
            phone2
            phone3
            phonePrincipal
          }
          seoEn {
            siteTitle
            metaDescription
            keywords
          }
          seoVi {
            keywords
            metaDescription
            siteTitle
          }
          seoZh {
            keywords
            metaDescription
            siteTitle
          }
          social {
            icon
            link
          }
          pushEnable
          pushBody
          pushActionUrl
          pushVibrate
          pushId
          pushImage {
            sourceUrl
          }
          pushBadge {
            sourceUrl
          }
          pushActionsIcon {
            sourceUrl
          }
          pushTitle
          footerLinksZh
          footerLinksVi
          footerLinksEn
          livechatLicense
          mainMenuColor
        }
      }
      allSettings {
        generalSettingsUrl
      }
    }
  }
  `)

  const [loading, setLoading] = useState(false)

  //Site ACF
  const siteUrl = queryGlobal.WP_1.allSettings.generalSettingsUrl
  const acf_settings = queryGlobal.WP_1.vbsettingBy.acf_settings
  const logoUrl = acf_settings.siteLogo.sourceUrl
  const logoAlt = acf_settings.siteLogo.altText

  const {
    livechatLicense,
    contactInfoEn,
    contactInfoVi,
    contactInfoZh,
    openAccountUrl,
    headerColor,
    footerColor,
    mainColors,
    mainMenuColor,
    secondColor,
    social,
    pushEnable,
    pushTitle,
    pushBody,
    pushActionUrl,
    pushVibrate,
    pushImage,
    pushBadge,
    pushActionsIcon,
    pushId,
    footerLinksZh,
    footerLinksVi,
    footerLinksEn,
  } = acf_settings

  const contactInfo = {
    en: contactInfoEn,
    vi: contactInfoVi,
    zh: contactInfoZh,
  }

  // const generalRuleslink ={
  //   en: generalRulesZh,
  //   vi: generalRulesVi,
  //   zh: generalRulesEn,
  // }
  useEffect(() => {
    //1check localStorage for pushId if != null && !=
    //then initializePushNotifications with new wp varialbles
    let pushIdLocal = localStorage.getItem('pushIdLocal')
    if (pushIdLocal === null || pushIdLocal === '') {
      pushIdLocal = pushId
      localStorage.setItem('pushIdLocal', pushId)
    }

    const pushNotificationSuported = isPushNotificationSupported()

    if (pushNotificationSuported && pushEnable) {
      //registerServiceWorker(); // estos deben ser diferentes
      if (pushIdLocal !== pushId.toString()) {
        //console.log(`${pushIdLocal} pushnotification ON ${pushId}`)
        initializePushNotifications().then(function(consent) {
          if (consent === 'granted') {
            sendNotification(
              pushTitle,
              pushBody,
              pushActionsIcon,
              pushImage,
              pushActionUrl
            )
            //console.log(`pushnotification granted `)
          } else {
            //console.log(`pushnotification NO granted `)
          }

          //save the push ID so dont publish again
          localStorage.setItem('pushIdLocal', pushId)
          //console.log(`pushIdLocal salvado  ${pushId} `)
        })
      }
    }
  })

  const Loading = () => {
    
    if (loading) {
      return (
        <div className={'loadingSpinner'}>
          <div className="loading">
            <CircularProgress  />
            Loading..
          </div>
        </div>
      )
    }
    return false
  }

  function loadingAction() {
    setLoading(true)
  }

  return (
    <GlobalProvider>
      <Loading />
  
      <SEO title={'index'} />
      <div
        className={`pgindex wrapper`}
        style={{ background: `${mainColors}` }}
      >
        <Header
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          headerColor={headerColor}
          mainMenuColor={mainMenuColor}
          siteUrl={siteUrl}
          loadingAction={()=>loadingAction()}
         
        />
        <SliderIndex />
        <main className="mobile loginbox">
          {<Login classvar={'middleSec'}  loadingAction={()=>loadingAction()}/>}
        </main>
        <Footer
          contactInfo={contactInfo}
          social={social}
          openAccount={openAccountUrl}
          footerColor={footerColor}
          footerLinks={[footerLinksEn, footerLinksVi, footerLinksZh]}
        />
      </div>
    </GlobalProvider>
  )
}

export default LayoutIndex
