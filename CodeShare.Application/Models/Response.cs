namespace CodeShare.Application.Models;

public enum ErrorType
{
    None, // Represents no error or a successful response
    BadRequest, // 400 Bad Request
    Unauthorized, // 401 Unauthorized
    Forbidden, // 403 Forbidden
    NotFound, // 404 Not Found
    ValidationError // Represents a validation error
}

public record ResponseData<T>(T? Data, string Message);

public class Response<T>
{
    public ResponseData<T> Data { get; private set; }
    public ErrorType ErrorType { get; private set; }
    public IDictionary<string, string[]>? ValidationErrors { get; private set; }

    public bool IsSuccessful => ErrorType == ErrorType.None;

    public Response<T> WithData(T? data, string message = "Success")
    {
        Data = new ResponseData<T>(data, message);
        ErrorType = ErrorType.None;
        return this;
    }

    public Response<T> AsError(string errorMessage, ErrorType errorType)
    {
        Data = new ResponseData<T>(default, errorMessage);
        ErrorType = errorType;
        return this;
    }

    public Response<T> AsError(FluentValidation.Results.ValidationResult validationResult)
    {
        Data = new ResponseData<T>(default, "One or more validation errors occurred.");
        ValidationErrors = FormatValidationErrors(validationResult);
        ErrorType = ErrorType.ValidationError;
        return this;
    }

    private static IDictionary<string, string[]> FormatValidationErrors(
        FluentValidation.Results.ValidationResult validationResult
    )
    {
        var formattedErrors = new Dictionary<string, string[]>();

        foreach (var failure in validationResult.Errors)
        {
            var fieldName =
                char.ToLowerInvariant(failure.PropertyName[0]) + failure.PropertyName[1..];
            var errorMessage = failure.ErrorMessage;

            if (formattedErrors.TryGetValue(fieldName, out string[]? value))
            {
                var existingErrors = value.ToList();
                existingErrors.Add(errorMessage);
                formattedErrors[fieldName] = existingErrors.ToArray();
            }
            else
            {
                formattedErrors.Add(fieldName, new[] { errorMessage });
            }
        }

        return formattedErrors;
    }
}
