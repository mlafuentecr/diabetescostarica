import React, { useState } from "react"
import { MdEmail } from "react-icons/md"
import { FaPhone } from "react-icons/fa"

const ContactIscons = () => {
  const [phone] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("phone") || "" : ""))
  const [email] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("email") || "" : ""))

  return (
    <div className="contactIcons">
      <MdEmail onClick={() => { document.location.href = `mailto:${email}` }} />
      <FaPhone onClick={() => { document.location.href = `tel:${phone}` }} />
    </div>
  )
}

export default ContactIscons
