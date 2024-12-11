import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompletionPage = () => {
  return (
    <div className="completion">
      <div className="completion__content">
        <div className="completion__icon">
          <Check className="size-16" />
        </div>
        <h1 className="completion__title">COMPLETED</h1>
        <p className="completion__message">
          🎉 You have successfully purchased the course. 🎉
        </p>
      </div>
      <div className="competion__support">
        <p>
          Need help? Contact our{" "}
          <Button variant="link" className="p-0 m-0 text-primary-700" asChild>
            <a href="mailto:support@example.com">customer support</a>
          </Button>
          .
        </p>
      </div>
      <div className="completion__action">
        <Link href="user/courses">Go to courses</Link>
      </div>
    </div>
  );
};

export default CompletionPage;
