"use client"
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
import { Contact } from "@/model/Contact";
import { getContactList } from "@/lib/ContactsAPI";

interface ContactState {
  contacts: Contact[];
  isLoading: boolean;
  creatingEditingContact: Contact | null;
}

interface ContactActions {
  fetchContacts: () => Promise<void>;
  setContacts: (contacts: Contact[]) => void;
  createContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
  setCreatingEditingContact: (contact: Contact | null) => void; 
}

type ContactStore = ContactState & ContactActions;

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      contacts: [],
      isLoading: true,
      creatingEditingContact: null,
      fetchContacts: async () => {
        set({ isLoading: true });
        try {
          const storedContacts = localStorage.getItem("contacts");
          if (storedContacts) {
            const parsedContacts = JSON.parse(storedContacts);
            if (get().contacts.length === 0) {
              set({ contacts: parsedContacts });
            } 
          } else {
            const contactsData = await getContactList();
            set({ contacts: contactsData });
            localStorage.setItem("contacts", JSON.stringify(contactsData));
          }
        } catch (error) {
          console.error("Error findind contacts:", error);
        } finally {
          set({ isLoading: false });
        }
      },
      setContacts: (contacts) => set({ contacts }),
      createContact: (contact) =>
        set((state) => {
          const nextId = state.contacts.length > 0
            ? Math.max(...state.contacts.map((c) => c.id)) + 1
            : 1;
          return {
            contacts: [...state.contacts, { ...contact, id: nextId }],
          };
        }),
      updateContact: (contact) =>
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === contact.id ? contact : c
          ),
        })),
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        })),
      setCreatingEditingContact: (contact) => set({ creatingEditingContact: contact }), 
    }),
    {
      name: 'contact-storage',
    }
  )
);