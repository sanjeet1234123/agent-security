import { MailPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";
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
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { useSendPDFMailMutation } from "@/hooks/mutations/use-incident-mutations";
import ReportContent from "../export-report-pdf/report-content";
import { generateReportPDF } from "@/lib/generate-report-pdf";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (value) => {
        const emails = value.split(",").map((email) => email.trim());
        return emails.every((email) => {
          if (email.length === 0) return false;
          return z.string().email().safeParse(email).success;
        });
      },
      {
        message: "Please enter valid comma-separated email addresses.",
      }
    ),
});

type EmailSchema = z.infer<typeof emailSchema>;

export default function SendPDFMail() {
  const { mutate, isPending } = useSendPDFMailMutation();
  const { resolvedTheme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [open, setOpen] = useState(false);

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Function to generate PDF from report content
  const generatePDFBlob = async (): Promise<Blob> => {
    const element = targetRef.current;
    if (!element) throw new Error("Target not found");

    const pdfBlob = await generateReportPDF({
      targetElement: element,
      theme: resolvedTheme,
      sendEmail: true,
    });

    if (!pdfBlob) throw new Error("Failed to generate PDF blob");
    return pdfBlob;
  };

  const onSubmit = async (data: EmailSchema) => {
    setIsGeneratingPDF(true);
    try {
      // Generate PDF blob
      const pdfBlob = await generatePDFBlob();

      // Send email with PDF
      mutate(
        { email: data.email, pdf: pdfBlob },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
          },
        }
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <MailPlus />
          <span>Send by Email</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send by Email</DialogTitle>
          <DialogDescription>
            Enter the recipient&apos;s email address to send the PDF report.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter recipient's email(s), separated by commas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || isGeneratingPDF}>
                {isPending || isGeneratingPDF ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>
                      {isGeneratingPDF ? "Generating PDF..." : "Sending..."}
                    </span>
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

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
    </Dialog>
  );
}
