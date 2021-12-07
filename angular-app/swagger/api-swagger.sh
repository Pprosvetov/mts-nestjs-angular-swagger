rm -rf ../src/app/api
java -jar swagger-codegen-cli-3.0.23.jar generate -i http://localhost:3000/api-json -l typescript-angular -c ./java-config.json -o ../src/app/api/
sed -i '' -e 's/ModuleWithProviders {/ModuleWithProviders<ApiModule> {/' ../src/app/api/api.module.ts
