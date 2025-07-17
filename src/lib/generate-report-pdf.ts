import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

interface GeneratePDFOptions {
  targetElement: HTMLElement;
  theme: string | undefined;
  sendEmail?: boolean;
  filename?: string;
}

export async function generateReportPDF({
  targetElement,
  theme,
  sendEmail = false,
  filename,
}: GeneratePDFOptions): Promise<Blob | void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageDivs = Array.from(
    targetElement.querySelectorAll<HTMLElement>(".page1")
  );

  for (let i = 0; i < pageDivs.length; i++) {
    const pageEl = pageDivs[i];

    // Render the page
    const canvas = await html2canvas(pageEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: theme === "light" ? "#fff" : "#1a1a1a",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);
  }

  if (sendEmail) {
    // Return PDF blob for email sending
    return pdf.output("blob");
  } else {
    // Download PDF file
    const now = new Date();
    const datePart = now.toISOString().split("T")[0];
    const timePart = now.toTimeString().split(" ")[0].replace(/:/g, "-");
    const defaultFilename = `agentsoc-report-${datePart}-${timePart}.pdf`;

    pdf.save(filename || defaultFilename);
  }
}
