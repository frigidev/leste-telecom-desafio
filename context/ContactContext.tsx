"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Contact } from "@/model/Contact";
import { getContactList } from "@/lib/ContactsAPI"; 

const ContactContext = createContext<ContactContextType>({
  contacts: [],
  setContacts: () => {},
  creatingEditingContact: null,
  setCreatingEditingContact: () => {},
  isLoading: true,
});

type ContactContextType = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  creatingEditingContact: Contact | null;
  setCreatingEditingContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  isLoading: boolean;
};

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [creatingEditingContact, setCreatingEditingContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      const storedContacts = localStorage.getItem("contacts");

      if (storedContacts) {
        try {
          const parsedContacts: Contact[] = JSON.parse(storedContacts);

          if (
            Array.isArray(parsedContacts) &&
            parsedContacts.every((contact: any) => 
              typeof contact.id === 'number' &&
              typeof contact.first_name === 'string' &&
              typeof contact.last_name === 'string' &&
              typeof contact.email === 'string' &&
              typeof contact.gender === 'string' &&
              typeof contact.language === 'string' &&
              typeof contact.avatar === 'string' &&
              contact.birthday instanceof Date
            ) 
          ) {
            setContacts(parsedContacts);
          } else {
            localStorage.removeItem("contacts"); 
          }
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          localStorage.removeItem("contacts"); 
        }
      } else {
        const fetchedContacts = await getContactList();
        setContacts(fetchedContacts);
      }
      setIsLoading(false);
    };

    loadContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, creatingEditingContact, setCreatingEditingContact, isLoading }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);