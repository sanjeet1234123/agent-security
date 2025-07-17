import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconFileTypePng, IconFileTypePdf } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Spinner from "@/components/ui/spinner";
import ReportContent from "./report-content";
import { generateReportPDF } from "@/lib/generate-report-pdf";

// Separate component for the report content

export function ExportReportPDF() {
  const { resolvedTheme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  // Function to handle PDF export with multi-page support
  const handleExportPDF = async () => {
    setLoadingPDF(true);
    try {
      const element = targetRef.current;
      if (!element) throw new Error("Target not found");

      await generateReportPDF({
        targetElement: element,
        theme: resolvedTheme,
        sendEmail: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPDF(false);
    }
  };

  // Function to handle PNG export (one PNG per .page1, like PDF)
  const handleExportPNG = async () => {
    setLoadingCSV(true);
    try {
      const element = targetRef.current;
      if (!element) throw new Error("Target not found");
      const pageDivs = Array.from(element.querySelectorAll<HTMLElement>(".page1"));
      if (pageDivs.length === 0) throw new Error("No .page1 elements found");
      for (let i = 0; i < pageDivs.length; i++) {
        const pageEl = pageDivs[i];
        // Dynamically import html2canvas-pro for PNG export (same as PDF)
        const html2canvas = (await import("html2canvas-pro")).default;
        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: resolvedTheme === "light" ? "#fff" : "#1a1a1a",
        });
        const dataUrl = canvas.toDataURL("image/png", 1);
        const link = document.createElement("a");
        link.href = dataUrl;
        const filename = `agentsoc-report-${new Date().toISOString().split("T")[0]}-${new Date().toTimeString().split(" ")[0].replace(/:/g, "-")}-page${i + 1}.png`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      console.log("PNG(s) exported successfully");
    } catch (error) {
      console.error("Error exporting PNG:", error);
    } finally {
      setLoadingCSV(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Download />
            <span>Export Report</span>
          </Button>
        </DialogTrigger>
        <DialogContent
          className="min-w-[80vw] max-h-[95vh] p-0"
          showCloseButton={false}
        >
          <DialogHeader hidden>
            <DialogTitle>Hidden Title</DialogTitle>
            <DialogDescription>Hidden Description</DialogDescription>
          </DialogHeader>

          {/* Visible PDF Preview Content - Scrollable */}
          <div className="pdf-content p-4 max-h-[80vh] overflow-y-scroll">
            <ReportContent />
          </div>

          <DialogFooter className="px-6 pb-6">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="gradient"
              onClick={handleExportPDF}
              className="cursor-pointer"
              disabled={loadingPDF}
            >
              {loadingPDF ? <Spinner /> : <IconFileTypePdf />}
              <span>{loadingPDF ? "Exporting..." : "Export PDF"}</span>
            </Button>
            <Button
              variant="gradient"
              onClick={handleExportPNG}
              className="cursor-pointer"
              disabled={loadingPDF}
            >
              {loadingCSV ? <Spinner /> : <IconFileTypePng />}
              <span>{loadingCSV ? "Exporting..." : "Export as Image"}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden PDF Export Content - Positioned off-screen but renderable */}
      <div
        ref={targetRef}
        className="fixed -top-[99999px] left-0 bg-white"
        style={{
          width: "1080px",
          zIndex: -1,
          minHeight: "auto",
          maxHeight: "none",
          overflow: "visible",
        }}
      >
        <ReportContent />
      </div>
    </>
  );
}
