import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <>
        <h1>Notepad</h1>
        <Link href="/main">
          <button>Noteを作成する</button>
        </Link>
      </>
    </div>
  );
}
