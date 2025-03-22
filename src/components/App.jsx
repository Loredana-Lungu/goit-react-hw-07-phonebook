import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
  setFilter,
  selectFilteredContacts,
  selectIsLoading,
  selectError,
  selectFilter,
} from '../redux/contactSlice';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import styles from './ContactForm.module.css';

const App = () => {
  const dispatch = useDispatch();
  
  // Utilizează selectorii Redux pentru state-ul curent
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  // Fetch contacts la montarea componentei
  useEffect(() => {
    console.log('Fetching contacts...');
    dispatch(fetchContacts());
  }, [dispatch]);

  // Handle pentru adăugarea unui contact
  const handleAddContact = (name, number) => {
    console.log(`Trying to add contact: ${name}, ${number}`);
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number })); // Backend-ul generează ID-ul
      console.log(`Contact added: ${name}`);
    }
  };

  // Handle pentru ștergerea unui contact
  const handleDeleteContact = (id) => {
    console.log(`Deleting contact with ID: ${id}`);
    dispatch(deleteContact(id));
  };

  // Handle pentru modificarea filtrului
  const handleFilterChange = (filterValue) => {
    dispatch(setFilter(filterValue));
  };

  return (
    <div className={styles.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
