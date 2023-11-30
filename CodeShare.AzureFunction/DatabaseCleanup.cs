using Microsoft.Azure.WebJobs;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace CodeShare.AzureFunction;

public static class DatabaseCleanup
{
    [FunctionName("DatabaseCleanup")]
    public static async Task Run([TimerTrigger("0 0 */3 * * *")] TimerInfo myTimer, ILogger log)
    {
        try
        {
            log.LogInformation($"Timer trigger function started at: {DateTime.Now}");

            // Create connection
            var connectionString = Environment.GetEnvironmentVariable("sqldb_connection");
            using SqlConnection conn = new SqlConnection(connectionString);
            await conn.OpenAsync();

            // SQL command
            const string sqlCommandText =
                "DELETE FROM [dbo].[CodeSnippets] WHERE [CreatedAt] < DATEADD(HOUR, -3, GETDATE());";
            using SqlCommand cmd = new SqlCommand(sqlCommandText, conn);

            // Execute command and log how many rows were deleted
            var rows = await cmd.ExecuteNonQueryAsync();
            log.LogInformation($"{rows} rows were deleted");

            log.LogInformation($"Timer trigger function completed at: {DateTime.Now}");
        }
        catch (Exception ex)
        {
            log.LogError($"An error occurred: {ex.Message}");
            throw;
        }
    }
}
