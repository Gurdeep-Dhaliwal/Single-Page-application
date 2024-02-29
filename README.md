
To run the project:

```
$ deno task run
```

## Accounts

The system comes pre-configured with an account:

- username: `doej`
- password: `p455w0rd`

You can use the registration option to create more accounts.

The secure page allows you to upload files to the server, this will need to be replaced with the functionality required by your assigned topic.

## Testing

There are a number of tests configured and these can be run using the `deno task` command:

1. Use the `deno task integration` command to run integration tests.
2. Use the `deno task lint` command to run the linter.

## Linting

The Deno Lint tool only works for code written for Deno so in this assignment it should only be run on the contents of the `api/` directory.

The linter uses the settings from the `deno.json` config file:

```
$ deno lint
```

## The Database

This Codio box comes with MySQL installed and ready to use. In addition to the **root** account there is a low-privilege account called **websiteuser** that is used by the API.

- **root** password: `p455w0rd`
- **websiteuser** password: `websitepassword
