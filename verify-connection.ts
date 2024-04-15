

import { Observable } from 'rxjs';
import https from "https"

export const checkInternetConnection = (url = 'https://www.google.com', timeoutPeriod = 5000) => { 
    return new Observable(subscriber => {
        const request = https.request(url, { method: 'HEAD' }, response => {
          if (response.statusCode === 200) {
            subscriber.next({ isConnected: true, message: 'Internet connection active' });
            
          } else {
            subscriber.next({ isConnected: false, message: `No internet connection or timeout exceeded: ${response.statusCode}` });
          }
          subscriber.complete();
        });
    
        request.on('error', error => {
            subscriber.next({ isConnected: false, message: "No internet connection" + JSON.stringify({error})});
        });
    
        request.setTimeout(timeoutPeriod, () => {
          request.abort(); // Cancel the request if it takes longer than timeoutPeriod
          subscriber.next({ isConnected: false, message: "No internet connection. Request time out"});
        });
    
        request.end();
      });
}
