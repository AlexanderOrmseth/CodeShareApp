import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormModel,
  FormValidation,
  ValidationErrors,
  ValidationErrorsSchema
} from "../validators/codeSnippetValidator";
import FormTextField from "../../../common/FormTextField/FormTextField";
import { Code, Info, Share } from "react-feather";
import LoadingButton from "../../../common/LoadingButton/LoadingButton";
import {
  CodeSnippetPreview,
  CodeSnippetBase
} from "../../../../models/codeSnippet";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import FormTextArea from "../../../common/FormTextAreaField/FormTextArea";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Props {
  submitFn: UseMutateAsyncFunction<string, unknown, CodeSnippetBase, unknown>;
  createPreviewFn: UseMutateAsyncFunction<
    CodeSnippetPreview,
    unknown,
    CodeSnippetBase,
    unknown
  >;
  previewIsPending: boolean;
}

const CodeSnippetForm = ({
  submitFn,
  createPreviewFn,
  previewIsPending
}: Props) => {
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors }
  } = useForm<FormModel>({
    resolver: zodResolver(FormValidation)
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleErrors = (err: any) => {
    if (
      err?.response?.data &&
      ValidationErrorsSchema.safeParse(err.response.data).success
    ) {
      const serverErrors: ValidationErrors = err.response.data;
      for (const [field, messages] of Object.entries(serverErrors.errors)) {
        setError(field as keyof FormModel, {
          type: "server",
          message: messages.join(", ")
        });
      }
    } else {
      // skip 429 errors, they are handled in queryClient
      if (err instanceof AxiosError && err?.response?.status === 429) {
        return;
      }
      toast.error("Something went wrong, please try again");
    }
  };

  const onSubmit = async (data: FormModel) => {
    try {
      await submitFn(data);
    } catch (err) {
      handleErrors(err);
    }
  };

  const createPreview = async () => {
    try {
      await createPreviewFn(getValues());
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <form
      className="bg-visual-studio-bg border-dark-300 space-y-4 rounded-lg border p-4 md:p-6"
      spellCheck={false}
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="border-dark-300 mb-4 border-b pb-2 ">
        <h2 className="mb-2 text-lg font-bold">Create code snippet</h2>
        <div className="flex flex-wrap items-center gap-x-2 text-sm leading-4 text-slate-300/90">
          <Info aria-hidden="true" size={16} />
          <p className="flex-1">
            Please note that your code snippet will be public and accessible to
            anyone with the link. Do <em>not</em> upload sensitive or personal
            information. Code snippets are periodically deleted every 3 hours.
          </p>
        </div>
      </header>
      <fieldset
        disabled={isSubmitting || previewIsPending}
        className="space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormTextField
            label="Title"
            maxLength={32}
            register={register("title")}
            error={errors.title}
          />
          <FormTextField
            label="Author"
            maxLength={32}
            register={register("author")}
            error={errors.author}
          />
        </div>

        <FormTextArea
          required
          label="Code"
          rows={10}
          maxLength={4000}
          register={register("code")}
          error={errors.code}
        />
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <LoadingButton
          type="button"
          disabled={!isValid || !isDirty || isSubmitting}
          loading={previewIsPending}
          loadingText="Fetching preview..."
          onClick={createPreview}
          Icon={Code}
          buttonText="Preview Code Snippet"
        />
        <LoadingButton
          type="submit"
          disabled={!isValid || previewIsPending}
          loading={isSubmitting}
          loadingText="Uploading code..."
          Icon={Share}
          buttonText="Upload And Share"
        />
      </div>
    </form>
  );
};

export default CodeSnippetForm;
