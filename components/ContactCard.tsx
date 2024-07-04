import { Contact } from '@/model/Contact';
import { Button } from './ui/button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TagIcon from '@mui/icons-material/Tag';
import TranslateIcon from '@mui/icons-material/Translate';
import WcIcon from '@mui/icons-material/Wc';
import PeopleIcon from '@mui/icons-material/People';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FaceIcon from '@mui/icons-material/Face';
import { format } from 'date-fns';
import { useContactStore } from '@/store/ContactStore';


export function ContactCard({
  first_name,
  id,
  last_name,
  email,
  gender,
  language,
  avatar,
  birthday,
  onDelete,
  onCreateEdit,
}: Contact & { onDelete: (id: number) => void; onCreateEdit: (contact: Contact | null) => (void) }) {
  const { setCreatingEditingContact } = useContactStore();

  return (
    <article className="dark:border-gray-500 group rounded-lg border border-transparent
      m-3 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100
    hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex flex-col justify-between">
      <dl className={`text-2xl font-semibold`}> 
        <div className="flex justify-center">
          <AccountCircleIcon className="leste"/>
        </div>
        <dt className="leste"><TagIcon className="icons" />ID:</dt>
        <dd>{id}</dd>
        <dt className="leste"><TagFacesIcon className="icons" />First Name:</dt>
        <dd>{first_name.charAt(0).toUpperCase() + first_name.slice(1)}</dd>
        <dt className="leste"><PeopleIcon className="icons" />Last Name:</dt>
        <dd>{last_name}</dd>
        <dt className="leste"><AlternateEmailIcon className="icons" />Email:</dt>
        <dd><span className="break-words w-fit">{email}</span></dd>
        <dt className="leste"><WcIcon className="icons" />Gender:</dt>
        <dd>{gender}</dd>
        <dt className="leste"><TranslateIcon className="icons" />Language:</dt>
        <dd>{language}</dd>
        <dt className="leste"><FaceIcon className="icons" />Avatar:</dt>
        <dd><img src={avatar}/></dd>
        <dt className="leste"><CalendarMonthIcon className="icons" />Birthday:</dt>
        <dd>{birthday ? format(new Date(birthday), 'yyyy-MM-dd') : ""}</dd>
      </dl>
      <div className="mt-4 flex gap-2 justify-end">
            <Button
              size="sm"
              onClick={() => { 
                setCreatingEditingContact({ first_name, id, last_name, email, gender, language, avatar, birthday }); 
                onCreateEdit({ first_name, id, last_name, email, gender, language, avatar, birthday }); 
              }}
              className="bg-back hover:bg-back"
            >
              <EditIcon className="leste" />
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(id)}
              className="bg-back hover:bg-back"
            >
              <DeleteIcon className="text-red-700" />
            </Button>
        </div>
    </article>
  );
}