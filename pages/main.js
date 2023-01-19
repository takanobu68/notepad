import styles from '../styles/main.module.css';
import Sidebar from '../components/Sidebar';
import MainPage from '../components/MainPage';
import { useRouter } from 'next/router';
import { logOut } from '../lib/logout';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const Main = () => {
  const [activeNote, setActiveNote] = useState(false);
  const [notes, setNotes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(collection(db, 'notes'));
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const signedIn = Cookies.get('signedIn');
      if (!signedIn) router.replace('/login');
    }
  }, []);

  const onDeleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id));
    const data = await getDocs(collection(db, 'notes'));
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <>
      <header>
        <button onClick={() => logOut()}>ログアウト</button>
        <Link href="/write">
          <button>Noteを書く</button>
        </Link>
      </header>
      <main className={styles.main}>
        <Sidebar
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          notes={notes}
        />
        <MainPage activeNote={getActiveNote()} />
      </main>
    </>
  );
};

export default Main;
