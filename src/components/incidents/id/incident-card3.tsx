import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle,
  Shield,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Incident } from "@/types/incident-type";
import {
  useAdminDecisionMutation,
  usePatchIncidentMutation,
} from "@/hooks/mutations/use-incident-mutations";
import { useState } from "react";
import { getDispositionBadgeColor } from "@/lib/common-function";
import Spinner from "@/components/ui/spinner";

interface IncidentCard4Props {
  incident: Incident;
}

export default function IncidentCard3({ incident }: IncidentCard4Props) {
  const patchIncidentMutation = usePatchIncidentMutation();
  const [actionStatus, setActionStatus] = useState<
    "approved" | "rejected" | null
  >(null);

  const workflowStages = [
    { title: "Triage Agent", description: "Check status and issues" },
    { title: "Enrich", description: "Check status and issues" },
    { title: "Investigate", description: "Check status and issues" },
    { title: "Contain", description: "Check status and issues" },
  ];

  const handleApprove = () => {
    patchIncidentMutation.mutate(
      {
        incident_id: incident.id,
        is_approved: true,
      },
      {
        onSuccess: () => {
          setActionStatus("approved");
        },
      }
    );
  };

  const getDispositionIcon = (status: string | null) => {
    if (!status) return null;

    switch (status) {
      case "Needs Attention":
        return <AlertTriangle className="h-4 w-4" />;
      case "Cleared":
        return <CheckCircle className="h-4 w-4" />;
      case "Contained":
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          Containment Agent - System of Action
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-6 px-4">
          <div className="flex items-center gap-6 w-fit">
            {workflowStages.map((stage, index) => (
              <div key={stage.title} className="flex items-center">
                <div className="text-center">
                  <h3 className="font-semibold text-base mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                {index < workflowStages.length - 1 && (
                  <div className="flex items-center ml-6">
                    <ArrowLeftRight className="h-8 w-8 stroke-1 text-muted-foreground/60 mx-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-300/15 p-4 rounded-lg flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium">Action Taken</h3>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getDispositionBadgeColor(
              incident.action
            )}`}
          >
            {getDispositionIcon(incident.action)}
            {incident.action || "Unknown"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-between items-center">
        <div>
          <h3>
            {incident.action === "Needs Attention"
              ? "Take Decision"
              : "Review Agent Decision"}
          </h3>
          <p className="text-sm text-muted-foreground font-normal">
            {incident.action === "Needs Attention"
              ? "Review the AI Generated response and perform the action. Please note this can not be reverted"
              : "Review the AI Generated response and perform the action. Please note this can not be reverted"}
          </p>
        </div>
        <div className="flex gap-4">
          {actionStatus === "approved" ? (
            <Button
              disabled
              className="bg-green-600/20 text-green-600 dark:bg-green-500/20 dark:text-green-400"
            >
              <CheckCircle className="h-4 w-4" />
              <p className="font-medium">Approved</p>
            </Button>
          ) : actionStatus === "rejected" ? (
            <Button
              disabled
              className="bg-red-600/20 text-red-600 dark:bg-red-500/20 dark:text-red-400"
            >
              <ThumbsDown className="h-4 w-4" />
              <p className="font-medium">Rejected</p>
            </Button>
          ) : (
            <>
              {incident.action === "Needs Attention" ? (
                <DialogueApprovedButton
                  incidentId={incident.id}
                  onSuccess={() => setActionStatus("approved")}
                />
              ) : (
                <Button
                  onClick={handleApprove}
                  disabled={patchIncidentMutation.isPending}
                  className="bg-green-600/20 text-green-600 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-600/30 hover:text-green-700 dark:hover:bg-green-500/30 dark:hover:text-green-300 cursor-pointer"
                >
                  {patchIncidentMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <Spinner className="mr-2" />
                      Approving...
                    </div>
                  ) : (
                    <>
                      <ThumbsUp className="h-4 w-4" />
                      <p className="font-medium">Approve</p>
                    </>
                  )}
                </Button>
              )}
              <DialogRejectedButton
                incidentId={incident.id}
                onSuccess={() => setActionStatus("rejected")}
              />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function DialogueApprovedButton({
  incidentId,
  onSuccess,
}: {
  incidentId: number;
  onSuccess?: () => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const adminDecisionMutation = useAdminDecisionMutation();
  const patchIncidentMutation = usePatchIncidentMutation();

  const handleSubmitApproval = () => {
    // First submit the feedback via admin decision mutation
    adminDecisionMutation.mutate(
      {
        conversation_id: incidentId.toString(),
        user_input: `revert for incident id ${incidentId}, feedback : ${feedback}`,
      },
      {
        onSuccess: () => {
          // Then approve the incident
          // patchIncidentMutation.mutate({
          //   incident_id: incidentId,
          //   is_approved: true,
          // });
          setIsOpen(false);
          setFeedback("");
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600/20 text-green-600 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-600/30 hover:text-green-700 dark:hover:bg-green-500/30 dark:hover:text-green-300 cursor-pointer">
          <ThumbsUp className="h-4 w-4" />
          <p className="font-medium">Approve</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg flex flex-col gap-8"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Approve Action</DialogTitle>
          <DialogDescription>
            Please provide feedback or confirmation for approving this action.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="approval-feedback">
              Provide Feedback (Optional)
            </Label>
            <Textarea
              id="approval-feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              minRows={2}
              maxRows={6}
              autosize
              placeholder="Please provide any additional feedback or confirmation..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="gradient"
            onClick={handleSubmitApproval}
            disabled={
              adminDecisionMutation.isPending || patchIncidentMutation.isPending
            }
            className="cursor-pointer"
          >
            {adminDecisionMutation.isPending ||
            patchIncidentMutation.isPending ? (
              <div className="flex items-center justify-center">
                <Spinner className="mr-2" />
                Approving...
              </div>
            ) : (
              "Approve Action"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogRejectedButton({
  incidentId,
  onSuccess,
}: {
  incidentId: number;
  onSuccess?: () => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const adminDecisionMutation = useAdminDecisionMutation();

  const handleSubmitFeedback = () => {
    adminDecisionMutation.mutate(
      {
        conversation_id: incidentId.toString(),
        user_input: `revert for incident id ${incidentId}, feedback : ${feedback}`,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setFeedback("");
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600/20 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-600/30 hover:text-red-700 dark:hover:bg-red-500/30 dark:hover:text-red-300 cursor-pointer">
          <ThumbsDown className="h-4 w-4" />
          <p className="font-medium">Reject</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg flex flex-col gap-8"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Help Improve AI Analysis</DialogTitle>
          <DialogDescription>
            Please provide the Cause so we can improve our AI&apos;s
            understanding for future incidents.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="reason">Provide Feedback</Label>
            <Textarea
              id="reason"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              minRows={2}
              maxRows={6}
              autosize
              placeholder="Please provide the reason here..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="gradient"
            onClick={handleSubmitFeedback}
            disabled={adminDecisionMutation.isPending}
            className="cursor-pointer"
          >
            {adminDecisionMutation.isPending ? (
              <div className="flex items-center justify-center">
                <Spinner className="mr-2" />
                Submitting...
              </div>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
