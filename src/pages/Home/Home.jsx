import React from 'react';
import { AuthGoogleContext } from '../../context/AuthGoogle';

export default function Home() {
  const { user, signOut } = React.useContext(AuthGoogleContext);
  console.log(user);
  return (
    <div>
      <h1>{user.displayName}</h1>
      <button onClick={() => signOut()}>sair</button>
      <img
        src={user.photoURL}
        alt="foto"
        referrerpolicy="no-referrer"
      />
    </div>
  );
}
