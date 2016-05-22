# Foosball Lambda Functions
This folder contains a [Serverless](https://github.com/serverless/serverless) framework application.

To install serverless run `npm i -g serverless`. Afterwards run `serverless project init` and follow the steps to create your own AWS environment.

## Local Testing
A function can be locally tested by running `serverless function run [function-name]` from this directory. This will ingest the `event.json` payload and output the result of the function. This emulates a request through the AWS API Gateway and a REST response.

## Deploying
Both the function endpoints and Lambda functions need to be deployed separately. To deploy the endpoints to API Gateway run `serverless endpoint deploy`. The URLs for each endpoint will be output during the deploy.

To deploy a function run `serverless function deploy [function-name]` or deploy all functions with `serverless function deploy -a`.
