import styles from './styles/mainpage.module.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const MainPage = ({ activeNote }) => {
  if (!activeNote) {
    return (
      <div className={styles.noActiveNote}>ノートが選択されていません</div>
    );
  }
  return (
    <div className={styles.appMain}>
      <div className={styles.appMainNotePreview}>
        <h2 className={styles.previewTitle}>{activeNote.title}</h2>
        <ReactMarkdown className={styles.markdownPreview}>
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MainPage;
