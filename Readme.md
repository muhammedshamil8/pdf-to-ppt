# PDF to PPT (Node.js)

Simple project to:
- Upload a PDF
- Read its text on the server
- Generate a PPT file
- Download the PPT

## Tech Stack
- Node.js
- Express
- pdf-parse
- pptxgenjs
- multer (for PDF upload)

## Folder Structure

pdf-to-ppt/

├── server.js

├── package.json

├── public/

│   └── index.html

├── uploads/

│   └── (uploaded pdfs)

└── output/
    └── result.pptx



## Setup
```bash
npm install
node server.js
```

Open:
http://localhost:3000

## Flow

1. User uploads PDF from UI
2. Server reads PDF text
3. Server creates PPT
4. PPT is sent back for download

## Notes

- PPT layout is text-based
- No PDF design/layout preservation
- One PDF → one PPT (baseline logic)

## Future Improvements

+ One page = one slide
+ Heading detection
+ Image extraction