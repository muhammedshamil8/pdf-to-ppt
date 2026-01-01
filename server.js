import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import PPTXGenJS from "pptxgenjs";

const app = express();
const __dirname = path.resolve();

app.use(express.static("public"));

/* 🔹 Multer setup */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, "input.pdf");
  }
});

const upload = multer({ storage });

/* 🔹 Upload PDF and generate PPT */
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const pdfPath = "uploads/input.pdf";

    if (!fs.existsSync(pdfPath)) {
      return res.status(400).send("PDF not uploaded");
    }

    /* 1️⃣ Read PDF */
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdf(buffer);

    /* 2️⃣ Create PPT */
    const pptx = new PPTXGenJS();

    // Simple logic: split text into chunks per slide
    const chunks = data.text.match(/(.|[\r\n]){1,800}/g);

    chunks.forEach((text, index) => {
      const slide = pptx.addSlide();
      slide.addText(`Slide ${index + 1}`, {
        x: 0.5,
        y: 0.3,
        fontSize: 24,
        bold: true
      });

      slide.addText(text, {
        x: 0.5,
        y: 1.2,
        w: "90%",
        h: "80%",
        fontSize: 14
      });
    });

    const pptPath = "output/result.pptx";
    await pptx.writeFile({ fileName: pptPath });

    /* 3️⃣ Send PPT */
    res.download(pptPath);

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate PPT");
  }
});

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
});
