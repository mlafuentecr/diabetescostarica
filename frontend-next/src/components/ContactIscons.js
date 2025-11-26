import React, { useEffect } from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhone } from 'react-icons/fa';



  const ContactIscons = (props) => {
    let phone  = ''
    let email = ''

  useEffect(() => {
     phone = localStorage.getItem("phone");
     email = localStorage.getItem("email");
     console.log(`email ${email}`);
  });

    return (
      <div class="contactIcons">
         <MdEmail onClick={() => { document.location.href=`mailto:${email}`; }} />
         <FaPhone  onClick={() => { document.location.href="tel:"+phone; }} />
      </div>
    )

}

export default  ContactIscons;