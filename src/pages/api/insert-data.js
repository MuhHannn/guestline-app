import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  let { nama, email, no_wa, keperluan } = await req.body;

  if (!nama || !email || !no_wa || !keperluan) {
    return res.status(400).json({ error: "Data harus valid" });
  }

  try {
    const resData = await sql`
      INSERT INTO guestline (nama, email, no_wa, keperluan, tanggal, bulan, tahun)
      VALUES (
        ${nama},
        ${email},
        ${no_wa},
        ${keperluan},
        ${new Date().getDate()},
        ${new Date().getMonth()},
        ${new Date().getFullYear()}
      )
      RETURNING *;`;

    return res.status(200).json({ message: "saved", data: resData });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
