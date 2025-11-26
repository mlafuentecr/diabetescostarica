import React from "react"
import LayoutIndex from "../components/layoutIndex"
import SEO from "../components/seo"

const IndexPage = (props) => (
   < LayoutIndex >
   <SEO title={'home'}  lang={'en'} defer={false}/>
  </LayoutIndex >
)

export default IndexPage
