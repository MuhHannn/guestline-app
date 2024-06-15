require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(nama, email, no_wa, keperluan) {
  const result = await sql`
        INSERT INTO guestline (nama, email, no_wa, keperluan)
        VALUES (${nama},  ${email}, ${no_wa}, ${keperluan})
        `;
  console.log(result);
}

execute("Hanan", "hanan@gmail.com", "+6282222222222", "Mau ketemu santri");
