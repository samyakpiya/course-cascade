import React from "react";
import StripeProvider from "./StripeProvider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useCheckoutNavigation } from "@/hooks/useChekoutNavigation";
import { useClerk, useUser } from "@clerk/nextjs";
import CoursePreview from "@/components/CoursePreview";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateTransactionMutation,
  useGetUserEnrolledCoursesQuery,
} from "@/state/api";
import { getCoursePath } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const PaymentPageContent = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [createTransaction] = useCreateTransactionMutation();

  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { data: enrolledCourses, isLoading: enrolledCoursesLoading } =
    useGetUserEnrolledCoursesQuery(user?.id ?? "", {
      skip: !isLoaded || !user,
    });

  if (!course) return null;

  if (enrolledCoursesLoading) return <Loading />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isCourseAlreadyPurchased = enrolledCourses?.some(
      (c) => c.courseId === courseId
    );

    if (isCourseAlreadyPurchased) {
      toast.warning("You are already enrolled in this course!", {
        action: (
          <Button
            className="text-white-100"
            onClick={() => router.push(getCoursePath(course))}
          >
            Go to course
          </Button>
        ),
      });
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe service is not available");
      return;
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : window.location.origin;

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const transactionData: Partial<Transaction> = {
          transactionId: result.paymentIntent.id,
          userId: user?.id,
          courseId: courseId,
          paymentProvider: "stripe",
          amount: course?.price || 0,
        };

        await createTransaction(transactionData);
        navigateToStep(3);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigateToStep(1);
  };

  return (
    <div className="payment">
      <div className="payment__container">
        {/* Order Summary */}
        <div className="payment__preview">
          <CoursePreview course={course} />
        </div>

        {/* Payment Form */}
        <div className="payment__form-container">
          <form
            id="payment-form"
            className="payment__form"
            onSubmit={handleSubmit}
          >
            <div className="payment__content">
              <h1 className="payment__title">Checkout</h1>
              <p className="payment__subtitle">
                Fill out the payment details below to complete your purchase.
              </p>

              <div className="payment__method">
                <h3 className="payment__method-title">Payment Method</h3>
                <div className="payment__card-container">
                  <div className="payment__card-header">
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </div>

                  <div className="payment__card-element">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="payment__actions">
        <Button
          className="hover:bg-white-50/10"
          variant="outline"
          type="button"
          onClick={handleSignOutAndNavigate}
        >
          Switch Account
        </Button>

        <Button
          form="payment-form"
          type="submit"
          className="payment__submit"
          disabled={!stripe || !elements}
        >
          Pay with Credit Card
        </Button>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <StripeProvider>
    <PaymentPageContent />
  </StripeProvider>
);

export default PaymentPage;
