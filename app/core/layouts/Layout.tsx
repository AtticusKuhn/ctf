import { Head, BlitzLayout, Routes, Link } from "blitz"
import React from "react"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "ctf"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
    <ul className="menu">
        <li className="logo"><Link  href={Routes.Home()}><a>Paly Python CTF</a></Link></li>
        <li className="item"><Link  href={Routes.ArticlesPage()}><a>Learn</a></Link></li>
        <li className="item"><Link  href={Routes.ChallengesPage()}><a>About</a></Link></li>
 
        <li className="item"><Link  href={Routes.Categories()}><a>Categories</a></Link></li>
        <li className="item"><Link  href={Routes.ChallengesPage()}><a>Challenges</a></Link></li>
        <li className="item"><Link href={Routes.LoginPage()}><a>Leader Board</a></Link></li>
        <li className="item button"><Link href={Routes.LoginPage()}><a>Log In</a></Link></li>
        <li className="item button secondary"> <Link href={Routes.LoginPage()}><a>Sign Up</a></Link></li>
        {/* <li className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li> */}
    </ul>
</nav>
      <section>{children}</section>
      <footer className="footer">
        <p>Footer</p>
      </footer>
      <style jsx>{`
       /* Basic styling */
       * {
           box-sizing: border-box;
           padding: 0;
           margin: 0;
       }
       body {
           font-family: sans-serif;
           font-size: 16px;
       }
       nav {
           background: #222;
           padding: 0 15px;
       }
       a, Link, .item  *, .item > *  {
           color: white;
           text-decoration: none;
       }
       .menu,
       .submenu {   
           list-style-type: none;
       }
       .logo {
           font-size: 20px;
           padding: 7.5px 10px 7.5px 0;
       }
       .item {
           padding: 10px;
       }
       .item.button {
           padding: 9px 5px;
       }
       .item:not(.button) a:hover,
       .item a:hover::after, item * {
           color: #ccc;
       }
       /* Mobile menu */
.menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.menu li a, Link, item * {
    display: block;
    padding: 15px 5px;
}
.menu li.subitem a {
    padding: 15px;
}
.toggle {
    order: 1;
    font-size: 20px;
}
.item.button {
    order: 2;
}
.item {
    order: 3;
    width: 100%;
    text-align: center;
    display: none;
}
.active .item {
    display: block;
}
.button.secondary { /* divider between buttons and menu links */
    border-bottom: 1px #444 solid;
}
/* Submenu up from mobile screens */
.submenu {
    display: none;
}
.submenu-active .submenu {
   display: block;
}
.has-submenu i {
    font-size: 12px;
}
.has-submenu > a::after, Link, .item *, .item > * {
    font-family: "Font Awesome 5 Free";
    font-size: 12px;
    line-height: 16px;
    font-weight: 900; 
    content: "\f078";
    color: white;
    padding-left: 5px;
}
.a, a {
  color: white !important;
}
.subitem a {
    padding: 10px 15px;
}
.submenu-active {
    background-color: #111;
    border-radius: 3px;
}
/* Tablet menu */

    .menu {
        justify-content: center;
    }
    .logo {
        flex: 1;
    }
    .item.button {
        width: auto;
        order: 1;
        display: block;
    }
    .toggle {
        flex: 1;
        text-align: right;
        order: 2;
    }
    /* Button up from tablet screen */
    .menu li.button a {
        padding: 10px 15px;
        margin: 5px 0;
    }
    .button a {
        background: #0080ff;
        border: 1px royalblue solid;
    }
    .button.secondary {
        border: 0;
    }
    .button.secondary a {
        background: transparent;
        border: 1px #0080ff solid;  
    }
    .button a:hover {
        text-decoration: none;
    }
    .button:not(.secondary) a:hover {
        background: royalblue;
        border-color: darkblue;
    }
    /* Desktop menu */
    .menu {
        align-items: flex-start;     
        flex-wrap: nowrap;
        background: none;
    }
    .logo {
        order: 0;
    }
    .item {
        order: 1;
        position: relative;
        display: block; 
        width: auto;
    }
    .button {
        order: 2;
    }
    .submenu-active .submenu {
        display: block;
        position: absolute;
        left: 0;
        top: 68px;
        background: #111;
    }
    .toggle {
        display: none;
    }
    .submenu-active {
        border-radius: 0;
    }

      `}</style>
    </>
  )
}

export default Layout
