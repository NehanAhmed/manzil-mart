"use client";

import { useState } from "react";
import { IconMail } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface NewsletterSubscribeProps {
  title?: string;
  description?: string;
  /** Async fn — throw to trigger the error state */
  onSubscribe?: (email: string) => Promise<void>;
  className?: string;
}

export function NewsletterSubscribe({
  title = "Subscribe to our Newsletter",
  description =
    "Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.",
  onSubscribe,
  className,
}: NewsletterSubscribeProps) {
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const validate = (value: string): string | null => {
    if (!value.trim()) return "Email address is required.";
    if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await onSubscribe?.(email.trim().toLowerCase());
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="py-14 px-8 flex flex-col items-center text-center gap-5">
        {/* Icon box */}
        <div className="size-12 rounded-xl border border-border flex items-center justify-center">
          <IconMail className="size-5 text-foreground" aria-hidden />
        </div>

        {/* Headings */}
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Form or success message */}
        {success ? (
          <p className="text-sm font-medium text-green-600">
            You&apos;re subscribed! Check your inbox soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full max-w-md gap-2 mt-1"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null); // clear on change
              }}
              disabled={loading}
              aria-label="Email address"
              aria-describedby={error ? "newsletter-error" : undefined}
              aria-invalid={!!error}
              className="flex-1"
            />
            <Button type="submit" disabled={loading} className="shrink-0">
              {loading ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        )}

        {error && (
          <p id="newsletter-error" className="text-xs text-destructive -mt-2">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}