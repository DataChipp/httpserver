# proxyserver
A Proxy Server for APIs and static assets implemented using Azure Functions

### Running with port 7071:

**VS Code**
```javascript
run from the debugger
```

**Terminal**
```javascript
func start --port 7071
```

**Azure Function**
replace datachipp with your function app name  

```
$ az login  
```
* if need to login as device:  $ az login --use-device-code  

```javascript
$ az group create --name datachipp --location centralus
$ az storage account create --name datachippstorage --location centralus --resource-group datachipp --sku standard_lrs --kind StorageV2
$ az functionapp create --name getfile --storage-account datachippstorage --resource-group datachipp --consumption-plan-location centralus
$ func azure functionapp publish datachipp
```

In Azure Portal
Select your function app  
Click the "Platform features" tab   
Click the "Configuration" link
Click the "+ New application setting"
```
Name  = file_api
Value = [value of file api for example https://datachippfile.azurewebsites.net 
   
Name  = data_api
Value = [value of file api for example https://datachippdata.azurewebsites.net


```
Click Save

Try a get from the browser (use test.http to test too)  
```javascript
https://datachipp.azurewebsites.net/api/data/blog/default
```

## Roadmap
1. additional error handling    
2. be a proxy for datachipp dataserver  
3. create blog UI using proxy for static files and dataserver for data  
  











