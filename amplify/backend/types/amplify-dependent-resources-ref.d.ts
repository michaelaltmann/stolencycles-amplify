export type AmplifyDependentResourcesAttributes = {
    "api": {
        "scrape": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        },
        "stolencycles": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "scrape": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "CloudWatchEventRule": "string"
        }
    }
}