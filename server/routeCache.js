/*
Express middleware that uses node-cache to implement lazy-loading caching by URL.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import NodeCache from "node-cache";

const cache = new NodeCache();

// function that caches based on URL, implements lazy loading
// so only adds to cache if that URL has not been hit before
export const checkCache = (duration) => (req,res, next) => {
    if(req.method !== 'GET'){
        console.error('Cannot cache non-get methods');
        return next();
    }
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if(cachedResponse){
        res.send(cachedResponse);
    } else{
        res.originalSend = res.send;
        res.send = body =>{
            res.originalSend(body);
            cache.set(key, body, duration);
        }
        next();
    }


}

