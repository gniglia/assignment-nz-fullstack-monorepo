import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "./utils";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-[4px]",
      className,
    )}
    style={{ backdropFilter: "blur(4px)" }}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {...(props as any)}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg gap-4 border border-gray-800 dark:border-gray-700 bg-background p-6 shadow-lg sm:rounded-lg",
        className,
      )}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
      asChild
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: "-50%",
          y: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          x: "-50%",
          y: "-50%",
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </motion.div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.3 }}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {...(props as any)}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    className={cn(
      "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-2 sm:space-x-0",
      className,
    )}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {...(props as any)}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {...(props as any)}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {...(props as any)}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
