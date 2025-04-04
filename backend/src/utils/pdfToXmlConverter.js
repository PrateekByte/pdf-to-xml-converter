const pdfParse = require("pdf-parse");
const { create } = require("xmlbuilder2");

const convertPdfToXml = (pdfBuffer) => {
  return new Promise((resolve, reject) => {
    try {
      pdfParse(pdfBuffer)
        .then((data) => {
          const xmlContent = buildPagewiseXmlContent(data);
          resolve(xmlContent);
        })
        .catch((err) => {
          console.error("Error parsing PDF:", err);
          reject(new Error("Failed to parse PDF file."));
        });
    } catch (err) {
      console.error("Error reading PDF buffer:", err);
      reject(new Error("Failed to read PDF buffer."));
    }
  });
};

const buildPagewiseXmlContent = (data) => {
  const pages = data.text.split("\f");
  const root = create({ version: "1.0", encoding: "UTF-8" }).ele("document");

  // Add metadata
  root
    .ele("metadata")
    .ele("title")
    .txt(data.info.Title || "Untitled")
    .up()
    .ele("author")
    .txt(data.info.Author || "Unknown")
    .up()
    .ele("creationDate")
    .txt(data.info.CreationDate || "Unknown")
    .up();

  pages.forEach((pageContent, pageIndex) => {
    const pageElement = root.ele("page", { number: pageIndex + 1 });
    const lines = pageContent.split("\n");
    let currentList = null;
    let currentTable = null;

    lines.forEach((line) => {
      if (line.trim().length === 0) return;

      if (line === line.toUpperCase() && line.trim().length > 5) {
        pageElement.ele("title").txt(line.trim());
        currentList = null;
        currentTable = null;
      } else if (line.startsWith("- ")) {
        if (!currentList) currentList = pageElement.ele("list");
        currentList.ele("item").txt(line.trim().substring(2));
        currentTable = null;
      } else if (line.includes("\t")) {
        if (!currentTable) currentTable = pageElement.ele("table");
        const rowElement = currentTable.ele("row");
        line
          .split("\t")
          .forEach((cell) => rowElement.ele("cell").txt(cell.trim()));
        currentList = null;
      } else {
        pageElement.ele("paragraph").txt(line.trim());
        currentList = null;
        currentTable = null;
      }
    });
  });

  return root.end({ prettyPrint: true });
};

module.exports = { convertPdfToXml };
