"use client";
import * as React from "react";
import * as Mui from "@mui/material";
import { Contact } from "@/model/Contact";
import { ContactForm } from "./ContactForm";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Contact, avatar: string) => Promise<void>;
  contact?: Contact | null;
  setIsModalOpen: (open: boolean) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const ContactModal: React.FC<ContactModalProps> = ({ 
  open, 
  onClose, 
  onSubmit, 
  contact,
}) => {
  return (
    <Mui.Modal open={open} onClose={onClose}>
      <Mui.Box
        sx={{
          ...style,
          bgcolor: "#A9A9A9",
          color: "black",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <Mui.Typography className="leste" variant="h6" component="h2">
          {contact ? "Update Contact" : "Create Contact"}
        </Mui.Typography>
        <ContactForm 
          contact={contact} 
          onSubmit={onSubmit} 
          onCancel={onClose} 
        />
      </Mui.Box>
    </Mui.Modal>
  );
};