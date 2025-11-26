import React, { useState, useEffect } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import LanguageForm from './LanguageForm'
const Menuvr2 = props => {
  const language = props.lenguage
  // const [showNav, setshowNav] = useState(false)

  //Call all menus
  const queryMenu = useStaticQuery(graphql`
    {
      WP_1 {
        menus {
          nodes {
            menuId
            name
            slug
            id
            menuItems {
              nodes {
                id
                label
                title
                url
                cssClasses
                childItems {
                  nodes {
                    id
                    url
                    label
                    title
                    target
                    cssClasses
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const menuColor = props.mainMenuColor
  const [showSubmenu] = useState(true)

  //ARROW MENU MOBILE
  //Muestra flecha y compara si el Id que mande es el mismo de donde estoy entonces abra

  const LinkArrow = props => (
    <span
      className="linksSubmenu"
      role="button"
      onClick={function(event) {
        event.target.parentElement.parentElement.classList.toggle('open')
      }}
    ></span>
  )

  const SubMenu = props => {
    let childItem = props.childNodes

    if (props.childsNumber > 0) {
      return (
        <ul className={`sub-menu `}>
          {childItem.map((subIndex, i) => {
            //LINK  remove url and just giveme the slug
            let subLinkMod = subIndex.url.replace(siteUrl, '')
            subLinkMod = subLinkMod.toLowerCase()
            return (
              <li key={i}>
                {' '}
                <Link key={subIndex.id} to={subLinkMod} className="linksMenu">
                  {subIndex.label}{' '}
                </Link>{' '}
              </li>
            )
          })}
        </ul>
      )
    }
    // return null
  }

  const allMenus = queryMenu.WP_1.menus.nodes
  const siteUrl = props.siteUrl

  const menuMain = allMenus.map((menu, index) => {
 

    if (menu.slug === `main-menu_${language}`) {
      return (
        <ul key={index} className="navbar-nav">
          {//Menulink link.childItems.nodes.length > 0 ?
          menu.menuItems.nodes.map((link, ii) => {
            //destructuring variables
            let { label, url, childItems } = link

            let subLinkUrl = url.replace(siteUrl, '')

            if (subLinkUrl) {
              //tomo el url y le quito el site pare quedar con el nombre del link

              //ACA PONER SI HAY ITEMS O SI NO NO DESPLIEGUE
              return (
                <li
                  key={ii}
                  className={`linksMenu ${showSubmenu === ii ? 'open' : ''}`}
                >
                  {/* Despliega menu principal */}
                  <Link to={subLinkUrl} className={`linkMenu`}>
                    {label}
                    {/*ARROW MENU MOBILE*/}
                    {childItems.nodes.length > 0 ? (
                      <LinkArrow number={ii} />
                    ) : (
                      ''
                    )}
                  </Link>

                  {/* SUB MENU */}

                  {childItems.nodes.length > 0 ? (
                    <SubMenu
                      number={ii}
                      childsNumber={childItems.nodes.length}
                      childNodes={childItems.nodes}
                    />
                  ) : (
                    ''
                  )}
                </li>
              )
            }
          })}
          <li className={`linksMenu`}>
            <a className="linkMenu">
              <LanguageForm className=" desktop" actionType={'mouseOver'} />
            </a>
          </li>
        </ul>
      )
    }
  })

  return (
    <div
      className={`mainMenu`}
      style={{ color: 'black', backgroundColor: `${menuColor}` }}
    >
      <div className="nav-wrapper container">{menuMain}</div>
    </div>
  )
}

export default Menuvr2
