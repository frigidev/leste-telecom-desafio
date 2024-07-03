"use client";
import * as React from "react";
import { ContactCard } from "./ContactCard";
import { Contact } from "@/model/Contact";

interface ContactListProps {
  filteredContacts: Contact[];
  onDeleteContact: (id: number) => void;
  onCreateEditContact: (contact: Contact | null) => void; 
}

export const ContactList: React.FC<ContactListProps> = ({ 
  filteredContacts,
  onDeleteContact,
  onCreateEditContact 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredContacts.map((contact) => (
        <article key={contact.id}>
          <ContactCard
            {...contact}
            onDelete={onDeleteContact}
            onCreateEdit={onCreateEditContact}
          />
        </article>
      ))}
    </div>
  );
};