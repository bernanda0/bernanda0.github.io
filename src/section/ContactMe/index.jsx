import { Mail } from "@mui/icons-material";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../api/firebase";

const GMAIL_TEMPLATE_URL =
  "https://mail.google.com/mail/u/0/?fs=1&to=inotbnri@gmail.com&su=Let%27s%20Connect%20:%20Bernanda%27s%20Portfolio&body=Hi!&tf=cm";

const GMAIL_ICON =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png";

const LINKED_MESSAGE = "https://www.linkedin.com/messaging/thread/new/";
const LINKED_ICON = "https://cdn-icons-png.flaticon.com/256/174/174857.png";

const WHATSAPP = "https://wa.me/85157772357";
const WHATSAPP_ICON =
  "https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png";

const ContactMe = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactList = [];
      const q = query(collection(database, "contact"));
      const qSnap = await getDocs(q);
      qSnap.forEach((doc) => contactList.push(doc.data()));
      setContacts(contactList);
      console.log(contactList[0].icon);
    };

    fetchContacts();
  }, []);

  return (
    <div className="h-screen w-full pt-10 flex flex-col justify-center">
      <div className="flex items-center">
        <h1 className="text-4xl ml-8 mr-48 w-48 font-mono font-bold animate-bounce">
          Contact Me
        </h1>

        <div className="hover:cursor-pointer hover:opacity-50 w-48 h-48 rounded-full p-10 bg-white flex items-center justify-center">
          <img
            src={contacts[0] ? contacts[0].icon : GMAIL_ICON}
            onClick={() =>
              window.open(
                contacts[0] ? contacts[0].url : GMAIL_TEMPLATE_URL,
                "_blank"
              )
            }
          />
        </div>

        <div
          className="hover:cursor-pointer hover:opacity-50 w-48 h-48 rounded-full p-10
        bg-white flex items-center justify-center ml-12"
        >
          <img
            src={contacts[2] ? contacts[2].icon : WHATSAPP_ICON}
            onClick={() =>
              window.open(contacts[2] ? contacts[2].url : WHATSAPP, "_blank")
            }
          />
        </div>

        <div
          className="hover:cursor-pointer hover:opacity-50 w-48 h-48 rounded-full p-10
        bg-white flex items-center justify-center ml-12"
        >
          <img
            src={contacts[1] ? contacts[1].icon : LINKED_ICON}
            onClick={() =>
              window.open(
                contacts[1] ? contacts[1].url : LINKED_MESSAGE,
                "_blank"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
