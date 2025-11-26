import React, { useEffect, useState } from 'react'
import Layout from '../components/layoutinternal'


import SEO from '../components/seo'

//Material Modal or popup
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

export default function Pages(props) {
  //Material Modal or popup
  const [open, setOpen] = useState(false)
  const [popUpTxt, setpopUpTxt] = useState('')
  let phone = '';
  let email = '';



  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    //TABS**
    const Tabs = document.querySelectorAll('.advgb-tab a')
    const TabsContent = document.querySelectorAll('.wp-block-advgb-tab')
    const tabWrap = document.querySelector('.advgb-tab-body-wrapper')
     phone = localStorage.getItem("phone");
     email = localStorage.getItem("email");
      console.log(phone); 
    //1 POr cada tab ponga un div para rellenar despues
    if (Tabs.length !== 0) {
      for (var ii = 0; ii < Tabs.length; ii++) {
        Tabs[ii].setAttribute('data-number', ii)
        const newElement = document.createElement('div')
        newElement.setAttribute('class', 'newContent  ')
        newElement.setAttribute('id', 'newContent-' + ii)
        newElement.setAttribute('data-number', ii)
        newElement.innerHTML = TabsContent[ii].innerHTML
        Tabs[ii].appendChild(newElement)
        console.log(Tabs[0])

        //le agrego un open la primera vez al primer tab popUpTxt
        Tabs[0].classList.add('open')
        tabWrap.children[0].classList.add('open')
      }
    }

    //IF scroll DIV //go TOP Scroll
    window.addEventListener("scroll", scrollFunc)

    //IF ADD ICONS DIV
    if(document.querySelectorAll('addChatIcons')){addIcons()};
    

  
  }, [])


  

 //go TOP Scroll ****************************************************
  const scrollFunc = () => {
    // Get the current scroll value
    let y = window.scrollY;
      // Set a variable for our button element.
   const scrollToTopButton = document.getElementById('scrollTop');

      if (y > 0) {
        scrollToTopButton.className = "top-link show";
      } else {
        scrollToTopButton.className = "top-link hide";
      }
   

  };

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}





 //CONTACT ICONS INSIDE PAGE ****************************************************
const addIcons = () => {
   
  const arrayIconsDivs = document.querySelectorAll(".addChatIcons");
  arrayIconsDivs.forEach((div)=>{
   div.innerHTML = `
            <div class="contactIcons">

              <a href='mailto:${email}'>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"  tabindex="8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
              </a>

              <a href='tel:${phone}'>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"  tabindex="9" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>
              </a>
             
              <a href="#" class="iconContact" onClick="window.open('https://direct.lc.chat/8867594/','chat','resizable,height=600,width=400'); return false;">
              <svg stroke="currentColor" fill="currentColor" class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></svg>
              </a>

            </div>
          `; 
  });

  
}


 //HANDLE CLICK ****************************************************
  function handleChick(e) {
    const divTitle = document.querySelectorAll('.open-links')
    const parent = e.target.closest('.wp-block-advgb-accordion-item')
    const divParent = e.target.parentElement
    const divParentTop = divParent.parentElement


    //RULES ****************************************************
    if (e.target.className === 'open-links') {
      divTitle[0].parentElement.classList.toggle('openRules')
    }
    

       //POP UPS****************************************************

    // If tiene rel y rel es
    if (e.target.rel === 'noopener noreferrer') {
      e.preventDefault();
      window.open(e.target.href, "_blank", "titlebar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800");
    }

    console.log(`${e.target.rel }******************POPUP`);
    console.log(e.target.rel === 'noopener');
    debugger

    // If tiene rel y rel es
    if (e.target.rel === 'noopener') {
      e.preventDefault();
      console.log(`******************POPUP`);
      window.open(e.target.href, "_blank", "titlebar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800");
    }

    //Tarjetas Banking ****************************************************
    if (e.target.rel === 'cardInfo') {
      const targetParent = e.target.closest('tbody').lastChild
      setpopUpTxt(targetParent.innerHTML)
      setTimeout(() => setOpen(true), 100)
    }

    if (e.target.rel === 'openParley') {
      let current = document.querySelector('.parleyInfo')
      console.log(current.innerHTML)
      setpopUpTxt(current.innerHTML)
      setTimeout(() => setOpen(true), 100)
    }



    //TABS ****************************************************

    function clearOpens() {
      // console.log('Tabs Vertical  clearOpens');
      // Tabs Vertical antes de poner el open
        if(document.querySelector('.advgb-tabs-panel') !== null){
        const tabVertical = document.querySelector('.advgb-tabs-panel')
        let matches = tabVertical.querySelectorAll('.advgb-tabs-panel .open')
        
        for (let x = 0; x < matches.length; x++) {
          document.querySelector('.advgb-tabs-panel .open').className = ''
        }
      }
    }

    //MoVile
    if (e.target.tagName === 'SPAN') {
      clearOpens()
      console.log(divParent.classList.contains('open'))

      if (divParent.classList.contains('open')) {
        divParent.classList.remove('open')
      } else {
        divParent.classList.add('open')
      }
    }

    //DESKTOP For Tabs Horizontal
    if (divParentTop.classList.contains('advgb-tab')) {
      //2 get body wrapper and remove open from all children creo que no lo Ocupa
      const tabWrap = document.querySelector('.advgb-tab-body-wrapper')
      for (let x = 0; x < tabWrap.children.length; x++) {
        tabWrap.children[x].classList.remove('open')
      }

      //3 cuando click toggle clases for content for desktop
      const divParent = e.target.parentElement
      const tabNumber = divParent.getAttribute('data-number')
      const tabContent = tabWrap.children[tabNumber]

      //4 Toggle class open to content
      if (tabContent) {
        tabContent.classList.contains('open')
          ? tabContent.classList.remove('open')
          : tabContent.classList.add('open')
      }
    } //Tabs  ENDS

    //ACORDION ****************************************************
    if (
      divParentTop.classList.contains('wp-block-advgb-accordions') ||
      divParentTop.classList.contains('wp-block-advgb-accordion-item') ||
      divParentTop.classList.contains('advgb-accordion-header') ||
      divParentTop.classList.contains('advgb-accordion-header-icon')
    ) {
      console.log('siii')
      parent.classList.contains('open')
        ? parent.classList.remove('open')
        : parent.classList.add('open')
    }
  }

 

  return (
    <Layout>
      <SEO title={props.pageContext.slug} />
      
      <div
        className={`content ${props.pageContext.slug}`}
        pgname={props.pageContext.slug}
        onClick={handleChick}
        dangerouslySetInnerHTML={{ __html: props.pageContext.content }} 
      />
      <a id="scrollTop" onClick={()=>topFunction()} href="#header" className="top-link hide">▲</a>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p dangerouslySetInnerHTML={{ __html: popUpTxt }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
