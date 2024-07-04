"use client";
import * as React from "react";
import * as Mui from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

interface ContactFiltersProps {
  searchTextGender: string;
  searchTextLanguage: string;
  searchTextAge: string;
  searchTextBirthMonth: string;
  onSearchTextChange: (field: string, value: string) => void;
}

export const ContactFilters: React.FC<ContactFiltersProps> = ({ 
  searchTextGender,
  searchTextLanguage,
  searchTextAge,
  searchTextBirthMonth,
  onSearchTextChange,
}) => {

  return (
    <>
        <InputLabel className="filter-label" htmlFor="contactGender">Contacts by Gender</InputLabel>
        <Mui.TextField
          className="leste-bg w-input-filters"
          type="text"
          id="contactGender"
          placeholder="Type the gender of a contact to filter."
          autoComplete="off"
          value={searchTextGender}
          onChange={(e) => onSearchTextChange('gender', e.target.value)}
        />

        <InputLabel className="filter-label" htmlFor="contactLanguage">Contacts by Language</InputLabel>
        <Mui.TextField
          className="leste-bg w-input-filters"
          type="text"
          id="contactLanguage"
          placeholder="Type the language of a contact to filter."
          autoComplete="off"
          value={searchTextLanguage}
          onChange={(e) => onSearchTextChange('language', e.target.value)}
        />

        <InputLabel className="filter-label" htmlFor="contactAge">Contacts by Age</InputLabel>
        <Mui.TextField
          className="leste-bg w-input-filters"
          type="text"
          id="contactAge"
          placeholder="Type the age of a contact to filter."
          autoComplete="off"
          value={searchTextAge}
          onChange={(e) => onSearchTextChange('age', e.target.value)}
        />

        <InputLabel className="filter-label" htmlFor="contactBirthMonth">Contacts by Birth Month</InputLabel>
        <Mui.TextField
          className="leste-bg w-input-filters"
          type="text"
          id="contactBirthMonth"
          placeholder="Type the birth month of a contact to filter."
          autoComplete="off"
          value={searchTextBirthMonth}
          onChange={(e) => onSearchTextChange('birthMonth', e.target.value)}
        />
    </>   
  );
};