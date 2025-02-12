"use client";

import * as ComboboxPrimitive from "@diceui/combobox";
import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Combobox = ComboboxPrimitive.Root;

const ComboboxLabel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Label
    ref={ref}
    className={cn("px-0.5 py-1.5 font-semibold text-sm", className)}
    {...props}
  />
));
ComboboxLabel.displayName = ComboboxPrimitive.Label.displayName;

const ComboboxAnchor = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Anchor>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Anchor>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Anchor
    ref={ref}
    className={cn(
      "relative flex w-full items-center justify-between gap-2 rounded-md border border-slate-200 bg-transparent px-3 py-2 shadow-sm data-[focused]:ring-1 data-[focused]:ring-slate-950 dark:border-slate-800 dark:data-[focused]:ring-slate-300",
      className,
    )}
    {...props}
  />
));
ComboboxAnchor.displayName = ComboboxPrimitive.Anchor.displayName;

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    ref={ref}
    className={cn(
      "flex w-full rounded-md bg-transparent text-base placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:placeholder:text-slate-400",
      className,
    )}
    {...props}
  />
));
ComboboxInput.displayName = ComboboxPrimitive.Input.displayName;

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex shrink-0 items-center justify-center rounded-r-md border-slate-200 bg-transparent text-slate-500 transition-colors hover:text-slate-950/80 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-50/80",
      className,
    )}
    {...props}
  >
    {children || <ChevronDown className="h-4 w-4" />}
  </ComboboxPrimitive.Trigger>
));
ComboboxTrigger.displayName = ComboboxPrimitive.Trigger.displayName;

const ComboboxCancel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Cancel
    ref={ref}
    className={cn(
      "-translate-y-1/2 absolute top-1/2 right-1 flex h-6 w-6 items-center justify-center rounded-sm bg-white opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus:ring-slate-300",
      className,
    )}
    {...props}
  />
));
ComboboxCancel.displayName = ComboboxPrimitive.Cancel.displayName;

const ComboboxBadgeList = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.BadgeList>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.BadgeList>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.BadgeList
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1.5", className)}
    {...props}
  />
));
ComboboxBadgeList.displayName = ComboboxPrimitive.BadgeList.displayName;

const ComboboxBadgeItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.BadgeItem>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.BadgeItem>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.BadgeItem
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between gap-1 rounded-sm bg-slate-100 px-2 py-0.5 dark:bg-slate-800",
      className,
    )}
    {...props}
  >
    <span className="truncate text-[13px] text-slate-900 dark:text-slate-50">
      {children}
    </span>
    <ComboboxPrimitive.BadgeItemDelete className="shrink-0 rounded p-0.5 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 data-[highlighted]:bg-red-500 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[highlighted]:bg-red-900">
      <X className="h-3 w-3" />
    </ComboboxPrimitive.BadgeItemDelete>
  </ComboboxPrimitive.BadgeItem>
));
ComboboxBadgeItem.displayName = ComboboxPrimitive.BadgeItem.displayName;

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Content
      ref={ref}
      sideOffset={6}
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-80 min-w-[var(--dice-anchor-width)] origin-[var(--dice-transform-origin)] overflow-scroll rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        className,
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Content>
  </ComboboxPrimitive.Portal>
));
ComboboxContent.displayName = ComboboxPrimitive.Content.displayName;

// eslint-disable-next-line react/display-name
const ComboboxProgress = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Progress>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Progress>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Progress
    ref={ref}
    className={cn("py-6 text-center text-sm", className)}
    {...props}
  >
    Loading...
  </ComboboxPrimitive.Progress>
));

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-sm", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = ComboboxPrimitive.Empty.displayName;

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden", className)}
    {...props}
  />
));
ComboboxGroup.displayName = ComboboxPrimitive.Group.displayName;

const ComboboxGroupLabel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.GroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 font-semibold text-slate-500 text-xs dark:text-slate-400",
      className,
    )}
    {...props}
  />
));
ComboboxGroupLabel.displayName = ComboboxPrimitive.GroupLabel.displayName;

const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item> & {
    outset?: boolean;
  }
>(({ className, children, outset, ...props }, ref) => (
  <ComboboxPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900 data-[disabled]:opacity-50 dark:data-[highlighted]:bg-slate-800 dark:data-[highlighted]:text-slate-50",
      outset ? "pr-8 pl-2" : "pr-2 pl-8",
      className,
    )}
    {...props}
  >
    <ComboboxPrimitive.ItemIndicator
      className={cn(
        "absolute flex h-3.5 w-3.5 items-center justify-center",
        outset ? "right-2" : "left-2",
      )}
    >
      <Check className="h-4 w-4" />
    </ComboboxPrimitive.ItemIndicator>
    <ComboboxPrimitive.ItemText>{children}</ComboboxPrimitive.ItemText>
  </ComboboxPrimitive.Item>
));
ComboboxItem.displayName = ComboboxPrimitive.Item.displayName;

const ComboboxSeparator = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800", className)}
    {...props}
  />
));
ComboboxSeparator.displayName = ComboboxPrimitive.Separator.displayName;

export {
  Combobox,
  ComboboxAnchor,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxCancel,
  ComboboxBadgeList,
  ComboboxBadgeItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxLabel,
  ComboboxProgress,
  ComboboxSeparator,
};
