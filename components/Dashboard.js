import Link from "next/link";
import {useRouter} from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react";

const Dashboard = ({ children, pageHeader, links }) => {
  const { data: session, status } = useSession()

  const router = useRouter()

  if(status === 'loading'){
    return (
      <div className="loading__page">
        <h3>Loading...</h3>
      </div>
    )
  }

  return (
   <div className="dashboard">
       <aside className="dashboard__aside">
           <header>
               <h1>Seydel</h1>
           </header>
           <ul className="dashboard__aside__nav">
           {links.map((link) => <li key={link.url}>
               <Link href={`${link.url}`}>{link.label}</Link>
             </li>)}
           </ul>
           <div className="dashboard__aside__signout__wrapper">
           <button type="submit" className="dashboard__aside__signout" onClick={() => signOut({
            callbackUrl: session.user.userType === 'admin'? `${process.env.NEXT_PUBLIC_APP_URL}/auth/admin/signin`:session.user.userType === 'landlord'? `${process.env.NEXT_PUBLIC_APP_URL}/auth/landlord/signin`:`${process.env.NEXT_PUBLIC_APP_URL}/signin`
            })}>Sign out</button>
           </div>
       </aside>
      <main className="dashboard__main">
        <header className="dashboard__main__header">
            <h3>{pageHeader}</h3>
            <h4 className="username">{session&&session.user.name.split(' ')[0]}</h4>
        </header>
        <main  className="dashboard__main__content">{children}</main>
        <footer className="dashboard__main__footer">
          <strong>&copy;{new Date().getFullYear()} Seydel Apartments. All Rights Reserved</strong>
        </footer>
      </main>
   </div>
  );
};

export default Dashboard;
