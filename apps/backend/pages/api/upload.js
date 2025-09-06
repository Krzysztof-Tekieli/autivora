// apps/backend/pages/api/upload.js
import fs from "fs";
import path from "path";
import multer from "multer";

export const config = {
  api: { bodyParser: false }, // wymagane dla multipart/form-data
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Dozwolone są tylko pliki graficzne"));
    }
    cb(null, true);
  },
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Tutaj zmiana z single -> array("files")
    await runMiddleware(req, res, upload.array("files"));

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Brak plików" });
    }

    const base = process.env.NEXT_PUBLIC_BACKEND_URL || `http://${req.headers.host}`;
    const urls = files.map(f => `${base}/uploads/${f.filename}`);

    return res.status(200).json({ urls }); // Zwracamy tablicę URL-i
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload error" });
  }
}
