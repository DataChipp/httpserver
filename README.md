# httpserver
An HTTP Server implemented using Azure Functions

## Running with port 8080:

**VS Code**
```javascript
run from the debugger
```

**Terminal**
```javascript
func start --port 8080
```

**Azure Function**
replace datachipp with your function app name  
$ az login  
if need to login as device:  $ az login --use-device-code  

```javascript
$ az group create --name datachipp --location centralus
$ az storage account create --name datachippstorage --location centralus --resource-group datachipp --sku standard_lrs --kind StorageV2
$ az functionapp create --name getfile --storage-account datachippstorage --resource-group datachipp --consumption-plan-location centralus
$ func azure functionapp publish datachipp
```

In Azure Portal







