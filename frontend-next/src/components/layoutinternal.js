import React, {useEffect} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GlobalProvider } from './context/globalContext'
import Header from './header'
import Footer from './footer'
import 'react-awesome-slider/dist/styles.css'
import 'react-awesome-slider/dist/custom-animations/cube-animation.css'

const Layout = ({ children }) => {
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
            headlineHeight
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
    footerLinksZh,
    footerLinksVi,
    footerLinksEn,
  } = acf_settings

  const contactInfo = {
    en: contactInfoEn,
    vi: contactInfoVi,
    zh: contactInfoZh,
  }



  
  useEffect(() => {
     
      const email = localStorage.getItem("email");
      const phone = localStorage.getItem("phone");
      
      if(email === '' || email === null){
        localStorage.setItem("email", contactInfoEn.email);
      }
      if(phone === '' || phone === null){
        localStorage.setItem("phone", contactInfoEn.phonePrincipal);
      }

      //console.log(`localStorage contactInfoEn.phonePrincipal ${ contactInfoEn.phonePrincipal }`);
      //console.log(`localStorage email ${localStorage.getItem("email")}`);
      //console.log(`localStorage phone ${localStorage.getItem("phone")}`);
      

  });



  let namePg = ''
  if (typeof children.props !== 'undefined') {
    namePg = children.props.pgname
  }

  return (
    <GlobalProvider>
      <div className={`wrapper pginternal ${namePg}`}>
        <Header
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          headerColor={headerColor}
          mainMenuColor={mainMenuColor}
          siteUrl={siteUrl}
        />
        <div className="container mainContent">
          <main>{children}</main>
          
        </div>
        <Footer
          contactInfo={contactInfo}
          social={social}
          openAccount={openAccountUrl}
          footerColor={footerColor}
          footerLinks={[footerLinksEn, footerLinksVi, footerLinksZh]}
          signUp={false}
        />
      </div>
    </GlobalProvider>
  )
}

export default Layout
