#Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./Biblioteca/Biblioteca.csproj" --disable-parallel
RUN dotnet publish "./Biblioteca/Biblioteca.csproj" -c release -o /app --no-restore

#Serve Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal
WORKDIR /app
COPY --from=build / app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "Biblioteca.dll"]

# docker build command
# docker build -t biblioteca:latest .