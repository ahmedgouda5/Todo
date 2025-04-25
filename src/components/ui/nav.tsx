import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

function Nav() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}

export default Nav;
