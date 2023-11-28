import { memo } from "react";
import { AlertCircle } from "react-feather";
import { Link } from "react-router-dom";
import { z } from "zod";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

const ProblemDetailsSchema = z.object({
  title: z.string(),
  status: z.number(),
  detail: z.string(),
  type: z.string().optional()
});

// type ProblemDetails = z.infer<typeof ProblemDetailsSchema>;

const ServerError = memo(({ error }: Props) => {
  if (!error) {
    return null;
  }

  const data = error?.response?.data;
  let detailMessage = "Unknown error, something went wrong";

  if (error?.message) {
    detailMessage = error.message;
  }

  if (ProblemDetailsSchema.safeParse(data).success) {
    detailMessage = data.detail;
  }

  return (
    <div
      className="flex items-center rounded border border-red-500 bg-red-500/50 p-2 text-red-100 shadow md:p-2.5"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle aria-label="Error alert" size="1.25rem" className="mr-2" />
      <p className="flex-1 text-sm font-normal">{detailMessage}</p>
      <Link
        className="bg-black/20 hover:bg-black/30 px-4 rounded py-0.5 text-sm"
        aria-label={`Error occurred. ${detailMessage}. Click to go back to home page.`}
        to="/"
      >
        Go back
      </Link>
    </div>
  );
});

export default ServerError;
