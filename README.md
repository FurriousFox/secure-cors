# Secure CORS Proxy
Normally, a CORS proxy would be able to read your data without you knowing.
This CORS proxy, however, keeps the SSL encryption between you and the server, so the proxy can't read your data.

##### See the demo at [https://furriousfox.github.io/secure-cors/](https://furriousfox.github.io/secure-cors/)

## Usage
### Running server
```shell
git clone https://github.com/FurriousFox/secure-cors.git
cd secure-cors/server
npm install
npm start -- -i -p 11711 # see `npm start -- --help` for more options
```
### Using client
```html
<!--
by default it hooks window.fetch
to prevent this, define window.sfetch
<script>
    window.sfetch = "anti-hook";
</script>
-->

<!-- load client js -->
<script src="https://cdn.jsdelivr.net/gh/FurriousFox/secure-cors/client/browser.js"></script>

<!-- first configure client, then make requests like you're used to -->
<script>
    fetch.config({
        // the hostname or ip address running the secure-cors server
        host: "example.com", // default: "127.0.0.1"

        // the port the secure-cors server is running on
        port: 443,           // default: 11711

        // whether to use wss:// or ws://
        secure: true,        // default: false

        // whether to use DNS-over-HTTPS to resolve the hostname
        doh: true,           // default: false
    });

    console.log("Fetching https://example.com ...")

    let response = await fetch("https://example.com", {
        method: "POST",
        body: "secret",
    });

    console.log("Status: ",         response.status);
    console.log("Response body: ",  await response.text());

    /* by default it hooks window.fetch,
    to undo this, use fetch.unhook()
    window.sfetch will stay available after unhooking */
    fetch.unhook();
</script>
```