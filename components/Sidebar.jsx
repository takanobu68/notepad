import styles from './styles/sidebar.module.css';
import Link from 'next/link';

const Sidebar = ({ onDeleteNote, activeNote, setActiveNote, notes }) => {
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className={styles.appSidebar}>
      <div className={styles.appSidebarHeader}>
        <h1>Notes</h1>
      </div>
      <div className={styles.appSidebarNotes}>
        {sortedNotes.map((note) => (
          <div
            className={`${styles.appSidebarNote} ${
              note.id === activeNote && `${styles.active}`
            }`}
            key={note.id}
            onClick={() => setActiveNote(note.id)}
          >
            <div className={styles.sidebarNoteTitle}>
              <strong>{note.title}</strong>
              <div>
                <button
                  className={styles.sidebarButton}
                  onClick={() => onDeleteNote(note.id)}
                >
                  削除
                </button>
                <Link
                  href={{
                    pathname: `/notes/${note.id}`,
                    query: { id: `${note.modDate}` },
                  }}
                >
                  <button className={styles.sidebarButton}>編集</button>
                </Link>
              </div>
            </div>
            <p>{note.content}</p>
            <small>
              {new Date(note.modDate).toLocaleDateString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
