amplify codegen models
cp src/models/index.js amplify/backend/function/scrape/src/models/index.ts
cp src/models/index.d.ts amplify/backend/function/scrape/src/models/index.d.ts

amplify codegen statements --maxDepth 3
cp src/graphql/queries.js src/graphql/queries-depth-3.js
cp src/graphql/queries.js amplify/backend/function/scrape/src/graphql/queries-depth-3.ts
amplify codegen statements --maxDepth 2
cp src/graphql/queries.js amplify/backend/function/scrape/src/graphql/queries.ts
cp src/graphql/mutations.js amplify/backend/function/scrape/src/graphql/mutations.ts; 
cp src/graphql/subscriptions.js amplify/backend/function/scrape/src/graphql/subscriptions.ts; 
pushd . 
cd amplify/backend/function/scrape/src
tsc 
popd 
amplify push --yes;