function Header() {
  return (
    <>
        <header className="bg-blue-500 text-white p-4">
            <h1 className="text-2xl font-bold">AI-EHR</h1>
            <nav className="mt-2">
            <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/patients" className="hover:underline">Patients</a></li>
                <li><a href="/appointments" className="hover:underline">Appointments</a></li>
                <li><a href="/settings" className="hover:underline">Settings</a></li>
            </ul>
            </nav>
        </header>
    </>
  );
}

export default Header;
