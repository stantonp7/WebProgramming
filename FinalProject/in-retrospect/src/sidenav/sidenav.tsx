import Link from "next/link";

export default function Sidenav ({children} : any) {
    const menuItems = [
        {
          href: '/',
          title: 'Homepage',
        },
        {
          href: '/about',
          title: 'About',
        },
        {
          href: '/contact',
          title: 'Contact',
        },
      ];
    return (
        <div className="min-h-screen flex flex-col">
        <header
            className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase"
        >
            Next.js sidebar menu
        </header>
        <div className="flex flex-col md:flex-row flex-1">
        <aside className='bg-fuchsia-100 w-full md:w-60'>
  <nav>
    <ul>
      {menuItems.map(({ href, title }) => (
        <li className='m-2' key={title}>
          <Link href={href}>

              {title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</aside>
            <main className="flex-1">{children}</main>
        </div>
        </div>
    );
}