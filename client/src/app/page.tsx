import Link from 'next/link'; //次ページに遷移するライブラリ
import React from 'react';

export default function Home() {
  return (
      <div>
          <h1>Hello World</h1>
          <Link href="/user">Go to User Page</Link>
      </div>
  );
}
// new page