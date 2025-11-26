
import React, {  useContext} from 'react';
import { useStaticQuery, graphql } from "gatsby"
import { GlobalContext }  from "../components/context/globalContext"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider)

const SliderIndex = (props) => {

  const queryGlobal = useStaticQuery(graphql`
  {
    WP_1 {
      vbsettingBy(id: "dmJzZXR0aW5nczoxOTQ3") {
        acf_settings {
          headlineEn {
            bgColor
            bgDesktop {
              altText
              sourceUrl
              link
            }
            enableheadline
            enablevideo
            imgDesktop {
              altText
              sourceUrl
            }
            imgDesktopMargins
            imgDesktopScale
            imgMobile {
              altText
              sourceUrl
            }
            mobileswitch
            positionH
            positionV
            video {
              altText
              sourceUrl
            }
            bgColorMobile
            headlineLink
          }
          headlineVi {
            bgColor
            bgDesktop {
              altText
              sourceUrl
            }
            enableheadline
            enablevideo
            imgDesktop {
              altText
              sourceUrl
            }
            imgDesktopMargins
            imgDesktopScale
            imgMobile {
              altText
              sourceUrl
            }
            mobileswitch
            positionH
            positionV
            video {
              altText
              sourceUrl
            }
            bgColorMobile
            headlineLink
          }
          headlineZh {
            bgColor
            bgDesktop {
              altText
              sourceUrl
            }
            enableheadline
            enablevideo
            imgDesktop {
              altText
              sourceUrl
            }
            imgDesktopMargins
            imgDesktopScale
            imgMobile {
              altText
              sourceUrl
            }
            mobileswitch
            positionH
            positionV
            bgColorMobile
            headlineLink
          }
        }
      }
    }
  }
    `)

//get language from useContext
//inside state there is language state.lenguage
const {state} = useContext(GlobalContext)

const acf_headlines = queryGlobal.WP_1.vbsettingBy.acf_settings
const {headlineEn, headlineVi, headlineZh, headlineHeight} = acf_headlines;

 
let headlineLenguage = '';

switch (state.lenguage) {

  case 'vi':
    headlineLenguage = headlineVi;
    break;

    case 'zh':
      headlineLenguage = headlineZh;
      break;

  default:
    headlineLenguage = headlineEn;
    break;
}





  const headlineItemTest = headlineLenguage.map((headline, index) => {

    //Declare variables
    let [bgColor, bgColorMobile, movImg, movImgAlt, deskmarg, deskImgUrl, deskImgAlt, deskScale, deskbg, deskPosX, deskPosY, sizeH, sizeW] = "none";
    deskScale = headline.imgDesktopScale
    bgColor = headline.bgColor;
    bgColorMobile = headline.bgColorMobile;
    deskmarg = headline.imgDesktopMargins;

    
    if (headline.imgDesktop) {

      //If desktop var exist make this 
      deskImgUrl = headline.imgDesktop.sourceUrl;
      deskImgAlt = headline.imgDesktop.altText;
      sizeH = headlineHeight;
      deskPosX = headline.positionH
      deskPosY = headline.positionV
 
    }

    
    if (headline.bgDesktop) {
      //If bg bgDesktop 
      deskbg = headline.bgDesktop.sourceUrl
    }

    
    if (headline.imgMobile && headline.mobileswitch) {
      //If mobile exist make this var
      movImg = headline.imgMobile.sourceUrl
      movImgAlt = headline.imgMobile.altText
    } else {
      if (headline.imgDesktop) {
        movImg = headline.imgDesktop.sourceUrl
        movImgAlt = headline.imgDesktop.altText
      }
    }
   

    if(headline.enableheadline !== null){
    return (
    
    <div key={index} className="headline" onClick={()=>{if(headline.headlineLink !== null){window.location.href = headline.headlineLink}}} style={{ backgroundColor: bgColor}}>

      <div className="desktop" style={{ height: "auto", alignItems: `${deskPosY}`,  justifyContent: `${deskPosX}`,  backgroundSize: 'cover', backgroundPosition: "bottom", backgroundColor: bgColor, backgroundImage: `url(${deskbg})` }} >
        <img src={deskImgUrl} alt={deskImgAlt}  style={{ transform: `scale(${deskScale})`, margin: `${deskmarg}`, marginBottom: 0,  maxWidth:'100%'}} width={`${sizeW}px`}  />
      </div>

      <div className="mobile" style={{ backgroundColor: `${bgColorMobile}`, alignContent: `${deskPosY}`, justifyContent: "center" }}>
        <img src={movImg} alt={movImgAlt} />
      </div>

    </div>

    )
  }

  return false;

});


   //creo un nuevo array sin banner que no esten enable
   const bannerArray = headlineItemTest.filter(Boolean);

   return (
     <AutoplaySlider
       // animation="cubeAnimation"
       animation="foldOutAnimation"
       className="ASlider"
       bullets={false}
       fillParent={false}
       organicArrows
       startup
       play
       cancelOnInteraction={false} // should stop playing on user interaction
       interval={56000}
     >
       {bannerArray}
     </AutoplaySlider>
   );
  }

  export default SliderIndex