using ApiGestaoClinica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // options.JsonSerializerOptions.IgnoreNullValues = true;
    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});

//builder.Services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
builder.Services.Configure<ApiBehaviorOptions>(options => {
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<GestaoClinicaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAngularDev");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
