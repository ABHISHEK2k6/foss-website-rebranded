import "../app/globals.css";

export default function Navbar() {
  return (
    <>
      {/* full-page background behind everything */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/galaxy.jpg')" }}
        />
      </div>

      <nav className="bg-transparent">
        <ul className="flex flex-row justify-between items-center p-4 text-white">
          <li className="flex-shrink-0">
            <h1 className="font-bold text-4xl">Foss</h1>
          </li>
          <li>
            <div className="flex flex-row gap-8">
              <a href="#" className="text-lg">Home</a>
              <a href="#" className="text-lg">About</a>
              <a href="#" className="text-lg">Achievements</a>
              <a href="#" className="text-lg">Team</a>
              <a href="#" className="text-lg">Contact</a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
