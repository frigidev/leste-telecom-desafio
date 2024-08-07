"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Contact } from "@/model/Contact";
import { GenderCount } from "@/components/GenderCount";
import { LanguageCount } from "@/components/LanguageCount";
import { useContactStore } from "@/store/ContactStore";
import AddIcon from "@mui/icons-material/Add";
import { ContactFilters } from "@/components/ContactFilters";
import toast from "react-hot-toast";
import { ContactList } from "@/components/ContactList";
import { ContactModal } from "@/components/ContactModal";
import Link from "next/link";

export default function ContactsPage() {
  const [searchTextGender, setSearchTextGender] = useState("");
  const [searchTextAge, setSearchTextAge] = useState("");
  const [searchTextBirthMonth, setSearchTextBirthMonth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTextLanguage, setSearchTextLanguage] = useState("");
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>([]); 

  const {
    contacts,
    isLoading,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    setCreatingEditingContact,
    creatingEditingContact,
  } = useContactStore();

  React.useEffect(() => {
    fetchContacts();
  }, []);

  React.useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const birthYear = new Date(contact.birthday).getFullYear();
      const age = currentYear - birthYear;
      const birthMonth = new Date(contact.birthday).getMonth() + 1;

      const matchGender = searchTextGender === "" ||
      contact.gender.toLowerCase().includes(searchTextGender.toLowerCase());

      const matchLanguage =
        !searchTextLanguage ||
        contact.language
          .toLowerCase()
          .includes(searchTextLanguage.toLowerCase());

      return (
        matchGender &&
        matchLanguage &&
        (searchTextAge === "" || age === parseInt(searchTextAge)) &&
        (searchTextBirthMonth === "" ||
          birthMonth === parseInt(searchTextBirthMonth))
      );
    });

    setDisplayedContacts(filtered); 
  }, [contacts, searchTextGender, searchTextLanguage, searchTextAge, searchTextBirthMonth]);

  const handleSubmitContact = async (
    data: Contact,
    avatar: string
  ): Promise<void> => {
    try {
      if (creatingEditingContact) {
        updateContact({
          ...creatingEditingContact,
          ...data,
          birthday: data.birthday
            ? new Date(data.birthday)
            : creatingEditingContact.birthday,
          avatar: avatar,
        });
        toast.success("Contact updated successfully!");
      } else {
        createContact({
          ...data,
          birthday: data.birthday ? new Date(data.birthday) : new Date(),
          avatar: avatar,
        });
        toast.success("Contact created successfully!");
      }
    } catch (error) {
      toast.error(`An error occurred while saving the contact. ${error}`);
    } finally {
      setIsModalOpen(false);
      setCreatingEditingContact(null); 
    }
  };

  const handleDeleteContact = (id: number) => {
    deleteContact(id);
    toast.success("Contact deleted successfully!");
  };

  const handleCreateEditContact = (contact: Contact | null) => {
    setCreatingEditingContact(contact);
    setIsModalOpen(true);
  };

  const genderCounts: { [key: string]: number } = {};
  displayedContacts.forEach((contact) => {
    const gender = contact.gender.toUpperCase();
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
  });

  const languageCounts: { [key: string]: number } = {};
  displayedContacts.forEach((contact) => {
    const language = contact.language;
    languageCounts[language] = (languageCounts[language] || 0) + 1;
  });

  const handleSearchTextChange = (field: string, value: string) => {
    switch (field) {
      case "gender":
        setSearchTextGender(value);
        break;
      case "age":
        setSearchTextAge(value);
        break;
      case "birthMonth":
        setSearchTextBirthMonth(value);
        break;
        case "language":
        setSearchTextLanguage(value);
        break;
    }
  };
  const [showLanguageSummary, setLanguageOpen] = useState(false);

  return (
    <main className="container mx-auto p-6 md:p-24">
      <div className="flex flex-col items-center mb-12">
        <Link href="/">
          <h2 className="leste text-3xl text-bold">
            <span className="leste-contact-leste">Leste</span>
            <span className="leste-contact-contact">Contact</span>
          </h2>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <aside className="md:col-span-1 ml-10 mt-2">
          <h3 className="leste text-2xl font-bold mb-2">Gender Summary</h3>
          <GenderCount counts={genderCounts} />
        </aside>

        <div className="md:col-span-1 flex flex-col items-center ">
          <h3 className="leste text-2xl font-bold mb-2">
            Contact Filters
          </h3>
          <ContactFilters
            searchTextGender={searchTextGender}
            searchTextAge={searchTextAge}
            setSearchTextGender={setSearchTextGender}
            searchTextBirthMonth={searchTextBirthMonth}
            searchTextLanguage={searchTextLanguage}
            setSearchTextLanguage={setSearchTextLanguage}
            onSearchTextChange={handleSearchTextChange}
            contacts={contacts}
          />
        </div>

        <aside className="md:col-span-1 flex flex-col items-start ml-20 mb-6">
          <LanguageCount counts={languageCounts} />
        </aside>
      </div>

      <section className="w-full mt-10">
        <div className="flex justify-center items-center mb-6">
          <h3 className="leste text-3xl font-bold">Contacts</h3>
          <Button
            onClick={() => handleCreateEditContact(null)}
            className="flex justify-center bg-back hover:bg-back"
          >
            <AddIcon fontSize="large" className="text-yellow-600" />
          </Button>
        </div>
      </section>

      <section>
        {isLoading ? (
          <p>Loading contacts...</p>
        ) : (
          <ContactList
            filteredContacts={displayedContacts}
            onDeleteContact={handleDeleteContact}
            onCreateEditContact={handleCreateEditContact}
          />
        )}
      </section>

      <ContactModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitContact}
        setIsModalOpen={setIsModalOpen}
      />
    </main>
  );
}