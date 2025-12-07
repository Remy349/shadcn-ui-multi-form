"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <InputGroup>
      <InputGroupInput
        type={show ? "text" : "password"}
        className={cn(className)}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" onClick={handleToggle}>
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export { PasswordInput };
