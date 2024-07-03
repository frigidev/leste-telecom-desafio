"use client";
import React, { createContext, useState, useContext } from "react";
import { Contact } from "@/model/Contact";

const ContactContext = createContext<ContactContextType>({
  contacts: [],
  setContacts: () => {},
  creatingEditingContact: null,
  setCreatingEditingContact: () => {},
});

type ContactContextType = {
  contacts: Contact[],
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  creatingEditingContact: Contact | null;
  setCreatingEditingContact: React.Dispatch<React.SetStateAction<Contact | null>>;
};

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [creatingEditingContact, setCreatingEditingContact] = useState<Contact | null>(null);
  
    return (
      <ContactContext.Provider value={{ contacts, setContacts, creatingEditingContact, setCreatingEditingContact }}>
        {children}
      </ContactContext.Provider>
    );
  };
  
  export const useContacts = () => useContext(ContactContext);