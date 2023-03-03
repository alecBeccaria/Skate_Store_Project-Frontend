
const fetchData = async (url, method, data) => {
    if (!url) return 'Error, url was not provided!';
    if (!method) return 'Error, request method was not provided!';

    //Headers to be sent in request
    var request = {
        mode: 'cors',
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    }

    if (method !== 'GET') {
        request.body = JSON.stringify(data.body);
    }

    // Checks to see if data object had Authorization included and if true adds auth header.
    if (data['Authorization']) {
        request.headers.Authorization = "Basic " + data['Authorization'];
    }


    console.log(request);
    console.log("Line 27 in data.js");
    //This is where we actually call the server.
    try {
        const response = await fetch(url, request);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        return {
            message: 'The server had an error.',
            error: error
        };
    }
}

const user_get = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'GET', { Authorization: auth, body: {} })
    console.log(response);
    return response;
}

const user_delete = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'DELETE', { Authorization: auth, body: {} })
    console.log(response);
    return response;
}

const user_put = async (user, auth) => {
    response = await fetchData(`https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user/${user}`, 'PUT', {
        Authorization: auth, body: {
            "password": "password",
            "email": "test",
            "cart": ['test', 'test1']
        }
    })
    console.log(response);
    return response;
}

const user_post = async (user) => {
    response = await fetchData('https://umj04k878g.execute-api.us-east-1.amazonaws.com/test/user', 'POST', {
        body: {
            username: user.username,
            email: user.email,
            password: user.password
        }
    })
    console.log(response);
}

module.exports = {
    fetchData: fetchData,
    user_get: user_get,
    user_post: user_post,
    user_delete: user_delete,
    user_put: user_put
}