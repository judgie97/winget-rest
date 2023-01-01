# Winget Rest

Winget rest repository implemented in Typescript

## Current state

This is a work in progress and currently only has some of the GET requests partially implemented. This targets version 1.1.0 of the winget REST specification as currently the Winget client seems to only use version 1.1.0 of the REST API even though 1.4.0 has been documented in the REST source repository.

## Links

- [Winget rest source](https://github.com/microsoft/winget-cli-restsource)
- [Version 1.1.0 specification](https://github.com/microsoft/winget-cli-restsource/blob/main/documentation/WinGet-1.1.0.yaml)
- [Swagger editor](https://editor.swagger.io/)
- [Winget Package Manifests](https://github.com/microsoft/winget-pkgs)

## Contributing

Please do :)

## API routes

| Method | Route                                                                              | Status                 |
| ------ | ---------------------------------------------------------------------------------- | ---------------------- |
| POST   | /packages                                                                          | No Authentication      |
| GET    | /packages                                                                          | Implemented            |
| PUT    | /packages/packageIdentifier                                                        | No Implemetation       |
| DELETE | /packages/packageIdentifier                                                        | No Authentication      |
| GET    | /packages/packageIdentifier                                                        | Implemented            |
|        |                                                                                    |
| POST   | /packages/packageIdentifier/versions                                               | No Authentication      |
| GET    | /packages/packageIdentifier/versions                                               | Implemented            |
| PUT    | /packages/packageIdentifier/versions/packageVersion                                | No Implementation      |
| DELETE | /packages/packageIdentifier/versions/packageVersion                                | No Implementation      |
| GET    | /packages/packageIdentifier/versions/packageVersion                                | Implemented            |
|        |                                                                                    |
| POST   | /packages/packageIdentifier/versions/packageVersion/locales                        | No Implementation      |
| GET    | /packages/packageIdentifier/versions/packageVersion/locales                        | No Implementation      |
| PUT    | /packages/packageIdentifier/versions/packageVersion/locales/packageLocale          | No Implementation      |
| DELETE | /packages/packageIdentifier/versions/packageVersion/locales/packageLocale          | No Implementation      |
| GET    | /packages/packageIdentifier/versions/packageVersion/locales/packageLocale          | No Implementation      |
|        |                                                                                    |
| POST   | /packages/packageIdentifier/versions/packageVersion/installers                     | No Authentication      |
| GET    | /packages/packageIdentifier/versions/packageVersion/installers                     | Implemented            |
| PUT    | /packages/packageIdentifier/versions/packageVersion/installers/installerIdentifier | No Implementation      |
| DELETE | /packages/packageIdentifier/versions/packageVersion/installers/installerIdentifier | No Implementation      |
| GET    | /packages/packageIdentifier/versions/packageVersion/installers/installerIdentifier | No Implementation      |
|        |                                                                                    |
| POST   | /packageManifests                                                                  | No Implementation      |
| PUT    | /packageManifests/packageIdentifier                                                | No Implementation      |
| DELETE | /packageManifests/packageIdentifier                                                | No Implementation      |
| GET    | /packageManifests/packageIdentifier                                                | No Implementation      |
| POST   | /manifestSearch                                                                    | Partial Implementation |
|        |                                                                                    |
| GET    | /information                                                                       | Partial Implementation |
