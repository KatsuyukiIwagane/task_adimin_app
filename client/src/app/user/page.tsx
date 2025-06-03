import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>User Login page</h1>
            <div>
                <p>This is the user login page.</p>
                <Link href="/task">Go to Task Page</Link>
            </div>
        </div>
    );
  }
  // new page