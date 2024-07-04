import { Contact } from "@/model/Contact";

const CONTACTS_API = "https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060";

export async function getContactList() {
  try {
    const response = await fetch(CONTACTS_API);
    const data: Contact[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting the data:", error);
    return [];
  }
}