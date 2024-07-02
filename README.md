# Secure CORS Proxy
Normally, a CORS proxy would be able to read your data without you knowing.
This CORS proxy, however, keeps the SSL encryption between you and the server, so the proxy can't read your data.

## Usage
### Start Server
```shell
git clone https://github.com/FurriousFox/secure-cors.git
cd secure-cors/server
npm install
npm start -- -i -p 8080
```