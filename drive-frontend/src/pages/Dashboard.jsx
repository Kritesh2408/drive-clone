import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FileCard from "../components/FileCard";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">My Files</h1>
          <div className="grid grid-cols-4 gap-4">
            <FileCard name="File 1" />
            <FileCard name="File 2" />
            <FileCard name="File 3" />
          </div>
        </main>
      </div>
    </div>
  );
}
