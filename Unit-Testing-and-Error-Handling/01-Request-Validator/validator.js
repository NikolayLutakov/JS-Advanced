function validate(inObj){
    validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    validUri = /^[0-9a-zA-Z.*]{1,}$/;
    validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    specialCharacterss = /[<>\\&'"]/;

    if(!validMethods.includes(inObj.method) || !inObj.hasOwnProperty('method')){
        throw Error('Invalid request header: Invalid Method');
    }

    if(!validUri.test(inObj.uri) || !inObj.hasOwnProperty('uri')){
        throw Error('Invalid request header: Invalid URI');
    }

    if(!validVersions.includes(inObj.version) || !inObj.hasOwnProperty('version')){
        throw Error('Invalid request header: Invalid Version');
    }
    
    if(specialCharacterss.test(inObj.message) || !inObj.hasOwnProperty('message')){
        throw Error('Invalid request header: Invalid Message');
    }

    return inObj;
}

validate({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
  });
