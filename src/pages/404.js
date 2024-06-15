import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="p-5">
      <div className="flex justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/");
          }}
        >
          Buat Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/daftar-antrian");
          }}
        >
          Daftar Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/print-all");
          }}
        >
          Cetak Semua
        </button>
      </div>
      <div className="flex flex-col justify-center align-items text-center">
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          404 - Page Not Found
        </button>
        <h1>The page you are looking for does not exist</h1>
      </div>
    </div>
  );
}
