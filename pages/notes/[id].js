import { db } from '../../lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useRouter } from 'next/router';

const Note = () => {
  const router = useRouter();
  const [noteData, setNoteData] = useState({});

  useEffect(() => {
    const modDate = Number(location.search.slice(4));
    const getNoteData = async () => {
      const q = query(collection(db, 'notes'), where('modDate', '==', modDate));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setNoteData({ ...doc.data(), id: doc.id });
      });
    };
    getNoteData();
  }, []);

  const handleEdit = () => {
    const editData = async () => {
      const nowData = doc(db, 'notes', noteData.id);

      await updateDoc(nowData, {
        title: noteData.title,
        content: noteData.content,
        modDate: Date.now(),
      });
    };

    editData();
    router.replace('/main');
  };

  return (
    <div className="app-main">
      <Link href="/main">
        <button>Note一覧</button>
      </Link>
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={noteData.content}
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
        ></textarea>
      </div>
      <button onClick={handleEdit}>編集</button>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{noteData.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {noteData.content}
        </ReactMarkdown>
      </div>
      <style jsx>{`
        .app-main {
          width: 100%;
          height: 100vh;
        }

        .app-main-note-edit,
        .app-main-note-preview {
          height: 50vh;
        }

        .app-main-note-edit {
          padding: 25px;
        }

        .app-main-note-edit input,
        textarea {
          display: block;
          border: 1px solid #ddd;
          margin-bottom: 20px;
          width: 100%;
          height: calc(50vh - 130px);
          padding: 5px;
          resize: none;
          font-size: 16px;
        }

        .app-main-note-edit input {
          height: 50px;
          font-size: 2rem;
        }

        .app-main-note-preview {
          border-top: 1px solid #ddd;
          overflow-y: scroll;
          background: rgba(0, 0, 0, 0.04);
        }

        .preview-title {
          padding: 25px 25px 0 25px;
          margin: 0;
        }

        .markdown-preview {
          padding: 0 25px 25px 25px;
          line-height: 2rem;
        }

        .no-active-note {
          width: 70%;
          height: 100vh;
          line-height: 100vh;
          text-align: center;
          font-size: 2rem;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default Note;
