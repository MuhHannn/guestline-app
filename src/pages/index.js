import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const nama = event.target.nama.value;
    const email = event.target.email.value;
    const no_wa = event.target.no_wa.value;
    const keperluan = event.target.keperluan.value;

    fetch("/api/insert-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: nama,
        email: email,
        no_wa: no_wa,
        keperluan: keperluan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        router.push("/daftar-antrian");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
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
      <form onSubmit={handleAdd} className="space-y-4 mt-10">
        <div className="text-center font-bold text-4xl">
          <h1>Buku Antrian Tamu</h1>
        </div>
        <input
          name="nama"
          className="w-full px-4 py-2 border rounded"
          placeholder="Masukkan Nama Lengkap Anda"
          required
        />
        <input
          name="email"
          className="w-full px-4 py-2 border rounded"
          placeholder="Masukkan Email Anda"
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
          required
        />
        <input
          name="no_wa"
          type="tel"
          className="w-full px-4 py-2 border rounded"
          placeholder="Masukkan Nomor Whatsapp Anda"
          pattern="\+62[0-9]{11,}"
          minlength="13"
          required
        />
        <input
          name="keperluan"
          className="w-full px-4 pt-2 pb-36 border rounded"
          placeholder="Masukkan Keperluan Anda"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Buat Nomor Antrian
        </button>
      </form>
    </div>
  );
}
