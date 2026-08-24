"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className=" bg-input  rounded-2xl">
      <InputGroup>
        <InputGroupInput
          id="password"
          type={showPassword ? "text" : "password"}
        />

        <InputGroupAddon align="inline-end">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}