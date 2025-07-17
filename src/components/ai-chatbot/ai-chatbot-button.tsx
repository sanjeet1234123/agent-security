import gsap from "gsap";
import { useRef, forwardRef } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const AIChatbotButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, forwardedRef) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      duration: 0.2,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => {
        if (textRef.current) {
          textRef.current.style.display = "none";
        }
      },
    });
    gsap.to(containerRef.current, {
      duration: 0.3,
      width: "44px",
      ease: "power2.out",
      delay: 0.1,
    });
  };

  const handleMouseEnter = () => {
    if (textRef.current) {
      textRef.current.style.display = "block";
    }
    gsap.to(containerRef.current, {
      duration: 0.3,
      width: "auto",
      ease: "power2.out",
    });
    gsap.to(textRef.current, {
      duration: 0.3,
      opacity: 1,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={(node) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      }}
      className={cn(
        "fixed bottom-10 right-10 cursor-pointer group",
        "bg-gradient-to-br from-blue-500 to-blue-700 rounded-full text-white p-2",
        "flex justify-center items-center gap-2 overflow-hidden",
        "w-[44px]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <IconSparkles stroke={1.5} size={28} className="flex-shrink-0" />
      <span
        ref={textRef}
        className="text-sm font-medium whitespace-nowrap opacity-0 hidden mr-2"
      >
        Ask AI
      </span>
    </button>
  );
});

AIChatbotButton.displayName = "AIChatbotButton";

export default AIChatbotButton;
