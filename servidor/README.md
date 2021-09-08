# Go 


## Prerequisitos

### Agregar variables de entorno
Agregar la siguiente variable de entorno al ~/.bashrc o ~/.zshrc
```bash
export NODE_ENV=dev
```

Una vez instalador para crear el projecto/modulo debemos ejecutar el siguiente comando
```bash
go mod init <nombre_de_tu_projecto>
```

## Ejecución en local
Para ejecutar el servidor se hace de la siguiente forma
```bash
# instalación de dependencias
go get

# Correr el servidor en el puerto :3000
go run server.go

# Correr el servidor en el puerto :3000
go builds server.go
```






