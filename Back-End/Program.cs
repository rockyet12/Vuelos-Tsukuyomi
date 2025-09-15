using Data;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer(); // <-- Necesario para Swagger
        builder.Services.AddSwaggerGen();           // <-- Agrega Swagger

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();            // <-- Habilita Swagger
            app.UseSwaggerUI();          // <-- Habilita la UI de Swagger
        }

        app.UseHttpsRedirection();
        app.MapControllers();

        app.Run();
    }
}
