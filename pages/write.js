import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Link from 'next/link';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/router';

const Write = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createNote = async () => {
    await addDoc(collection(db, 'notes'), {
      title: title,
      content: content,
      modDate: Date.now(),
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button onClick={createNote}>保存</button>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{title}</h1>
        <ReactMarkdown className="markdown-preview">{content}</ReactMarkdown>
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

export default Write;
