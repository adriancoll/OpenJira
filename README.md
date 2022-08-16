# Next.js OpenJira App
Para iniciar localmente, se necesita la base de datos
```
docker-compose up -d
```

* EL -d, significa __detached__

* MongoDB URL local:
```
mongodb://localhost:27017
```

## Configurar las variables de entorno
Renombrar el archivo __.env.example__ a __.env__

* Reconstruir los módulos de node y levantar Nextf
```
yarn install
yarn dev
```

## Llenar la base de datos con información para desarrollo

Llamar a:
```
    https://localhost:3000/api/seed
```

