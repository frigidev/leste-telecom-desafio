"use client";
import * as React from "react";
import { format } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm, useController } from 'react-hook-form';
import { Contact } from "@/model/Contact";
import * as Mui from "@mui/material";
import { useContactStore } from "@/store/ContactStore"; 

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: Contact, avatar: string) => Promise<void>;
  onCancel: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit, onCancel }) => {
  const [date, setDate] = useState<Date | null>(contact?.birthday || null);
  const [avatar, setAvatar] = useState(contact?.avatar || "");

  const handleSubmitForm: SubmitHandler<Contact> = async (data) => { 
    try {
      await onSubmit(data, avatar);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset, 
  } = useForm<Contact>({
    mode: 'onChange',
    defaultValues: contact ? { 
      ...contact,
      birthday: contact.birthday ? new Date(format(new Date(contact.birthday), 'yyyy-MM-dd')) : undefined, 
  } : {}, 
  });

  const { field } = useController({
    name: 'birthday',
    control: control,
    rules: { required: true },
  });

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Mui.TextField
        {...register("first_name", {
          required: true,
          pattern: /^[A-Z][a-z]{1,15}$/
        })}
        label="First Name"
        defaultValue={contact?.first_name || ""}
        fullWidth
        margin="normal"
        className="leste-bg w-input-form"
        InputLabelProps={{
            sx: {
                ':not(.Mui-focused)': { 
                    color: '#fff',
                },'&.Mui-focused': {
                    color: '#fff',
                },
            }
        }}
      />
      {errors.first_name?.type === 'required' && (
        <span className="text-red-500">This is a required field</span>
      )}
      {errors.first_name?.type === 'pattern' && (
        <span className="text-red-500">Your first name must begin with a capital letter and have 2-15 characters</span>
      )}
      
      <Mui.TextField
            {...register("last_name", {
                required: true,
                pattern: /^[A-Z][a-z]{1,15}$/
            })} 
            label="Last Name"
            defaultValue={contact?.last_name || ""}
            fullWidth
            margin="normal"
            className="leste-bg w-input-form"
            InputLabelProps={{
                sx: {
                    ':not(.Mui-focused)': { 
                        color: '#fff',
                    },'&.Mui-focused': {
                        color: '#fff',
                    },
                }
            }}
        />
        {errors.last_name?.type === 'required' && (
            <span className="text-red-500">This is a required field</span>
        )}
        {errors.last_name?.type === 'pattern' && (
            <span className="text-red-500">Your last name must begin with a capital letter and have 2-15 characters</span>
        )}
        <Mui.TextField
            {...register("email", {
                required: true,
                pattern: /^([\w].+)@([\w]{2,15}).([\w]{2,10})(.[\w]{2,10})?$/
            })} 
            label="Email"
            defaultValue={contact?.email || ""}
            fullWidth
            margin="normal"
            className="leste-bg w-input-form"
            InputLabelProps={{
                sx: {
                    ':not(.Mui-focused)': { 
                        color: '#fff',
                    },'&.Mui-focused': {
                        color: '#fff',
                    },
                }
            }}
        />
        {errors.email?.type === 'required' && (
            <span className="text-red-500">This is a required field</span>
        )}
        {errors.email?.type === 'pattern' && (
            <span className="text-red-500">Enter a valid email address (e.g., example@domain.com)</span>
        )}
        <Mui.TextField
            {...register("gender", {
                required: true,
                pattern: /^[M|F]$/
            })} 
            label="Gender"
            defaultValue={contact?.gender || ""}
            fullWidth
            margin="normal"
            className="leste-bg w-input-form"
            InputLabelProps={{
                sx: {
                    ':not(.Mui-focused)': { 
                        color: '#fff',
                    },'&.Mui-focused': {
                        color: '#fff',
                    },
                }
            }}
        />
        {errors.gender?.type === 'required' && (
            <span className="text-red-500">This is a required field</span>
        )}
        {errors.gender?.type === 'pattern' && (
            <span className="text-red-500">Your gender must be F (Female) or M (Male)</span>
        )}
        <Mui.TextField
            {...register("language", {
                required: true,
                pattern: /^[A-Z][a-z]{2,20}$/
            })} 
            label="Language"
            defaultValue={contact?.language || ""}
            fullWidth
            margin="normal"
            className="leste-bg w-input-form"
            InputLabelProps={{
                sx: {
                    ':not(.Mui-focused)': { 
                        color: '#fff',
                    },'&.Mui-focused': {
                        color: '#fff',
                    },
                }
            }}
        />
        {errors.language?.type === 'required' && (
            <span className="text-red-500">This is a required field</span>
        )}
        {errors.language?.type === 'pattern' && (
            <span className="text-red-500">Your language must begin with a capital letter and have between 3-20 characters</span>
        )}
      <Mui.TextField
        {...register("avatar", { 
          required: true,
        })}
        label="Avatar URL"
        type="text"
        fullWidth
        margin="normal"
        value={avatar} 
        onChange={(e) => setAvatar(e.target.value)}
        error={!!errors.avatar}
        helperText={errors.avatar?.message}
        className="leste-bg w-input-form"
        InputLabelProps={{
            sx: {
                ':not(.Mui-focused)': { 
                    color: '#fff',
                },'&.Mui-focused': {
                    color: '#fff',
                },
            }
        }}
      />
      <Mui.TextField
        {...field}
        label="Birthday"
        type="date"
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        fullWidth
        margin="normal"
        onChange={(e) => {
          const selectedDate = e.target.value ? new Date(e.target.value) : null;
          const displayDate = selectedDate ? new Date(selectedDate.setDate(selectedDate.getDate() + 1)) : null;
          setDate(displayDate);
          field.onChange(displayDate);
        }}
        className="leste-bg w-input-form"
        InputLabelProps={{
            shrink: true,
            sx: {
                ':not(.Mui-focused)': { 
                    color: '#fff',
                },'&.Mui-focused': {
                    color: '#fff',
                },
            }
        }}
        sx={{
            '& .MuiInputBase-input': { 
              color: '#fff',
            },
        }}
      />
      <div className="flex justify-center">
        <Mui.Button type="submit" variant="contained" disabled={isSubmitting} sx={{ backgroundColor: "#1A8F6E", color: "#000", fontWeight: 500, '&:hover': { backgroundColor: '#fff' } }}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Mui.Button>
        <Mui.Button type="button" onClick={onCancel} variant="outlined" sx={{ ml: 4, backgroundColor: "#1A8F6E", color: "#000", fontWeight: 500, border: 'none', '&:hover': { backgroundColor: '#fff', border: 'none' } }}>
          Cancel
        </Mui.Button>
      </div>
    </form>
  );
};