export default function(clientId: string) {
  if (!document.getElementById('linkedin-sdk')) {
    let script = document.createElement('script');
    script.id = 'linkedin-sdk'
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function(){
        // remote script has loaded
    };
    script.src = 'https://platform.linkedin.com/in.js';
    script.innerHTML = `\napi_key: ${clientId}\nauthorize: false`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
