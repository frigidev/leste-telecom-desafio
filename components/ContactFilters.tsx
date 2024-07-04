"use client";
import * as React from "react";
import * as Mui from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface ContactFiltersProps {
  searchTextGender: string;
  searchTextLanguage: string;
  searchTextAge: string;
  searchTextBirthMonth: string;
  onSearchTextChange: (field: string, value: string) => void;
  setSearchTextGender: (value: string) => void;
  setSearchTextLanguage: (value: string) => void;
  contacts: { id: number; language: string; gender: string }[];
}

export const ContactFilters: React.FC<ContactFiltersProps> = ({
  searchTextGender,
  searchTextLanguage,
  searchTextAge,
  searchTextBirthMonth,
  onSearchTextChange,
  setSearchTextGender,
  setSearchTextLanguage,
  contacts,
}) => {
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | Mui.SelectChangeEvent<string>,
    field: string
  ) => {
    const value =
      (event.target as HTMLInputElement).value || event.target.value;

    onSearchTextChange(field, value);

    if (field === "language") {
      setSearchTextLanguage(value);
    }
    if (field === "gender") {
      setSearchTextGender(value);
    }
  };

  const getUniqueLanguages = () => {
    if (!contacts) {
      return [];
    }
    const languages = contacts.map((contact) => contact.language);
    return [...new Set(languages)];
  };

  return ( 
    <>
      <FormControl fullWidth margin="normal" className="leste-bg w-select-filters">
        <InputLabel id="gender-select-label">Filter Contacts by Gender</InputLabel>
        <Mui.Select
          labelId="gender-select-label"
          id="gender-select"
          value={searchTextGender}
          label="Contacts by Gender"
          onChange={(e) => handleChange(e, "gender")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="F">F</MenuItem>
        </Mui.Select>
      </FormControl>

      <FormControl fullWidth margin="normal" className="leste-bg w-select-filters">
        <InputLabel id="language-select-label">
          Filter Contacts by Language
        </InputLabel>
        <Mui.Select
          labelId="language-select-label"
          id="language-select"
          value={searchTextLanguage} 
          label="Contacts by Language"
          onChange={(e) => handleChange(e, "language")}
        >
          <MenuItem value="">All</MenuItem>
          {getUniqueLanguages().map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Mui.Select>
      </FormControl>

      <FormControl fullWidth margin="normal" className="leste-bg w-select-filters">
        <InputLabel id="age-select-label">Filter Contacts by Age</InputLabel>
        <Mui.Select
          labelId="age-select-label"
          id="age-select"
          value={searchTextAge}
          label="Contacts by Age"
          onChange={(e) => handleChange(e, 'age')}
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 120 }, (_, i) => i + 1).map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </Mui.Select>
      </FormControl>

      <FormControl fullWidth margin="normal" className="leste-bg w-select-filters">
        <InputLabel id="birthMonth-select-label">Filter Contacts by Birth Month</InputLabel>
        <Mui.Select
          labelId="birthMonth-select-label"
          id="birthMonth-select"
          value={searchTextBirthMonth}
          label="Contacts by Birth Month"
          onChange={(e) => handleChange(e, 'birthMonth')}
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Mui.Select>
      </FormControl>
    </>
  );
};