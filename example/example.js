// A simple example of implementing a new api

console.log('Example API');

// Export that the container will call to initialise the api
//
// The exposed function will receive two parameters:
//  router  the router to which requests are bound to
//  config  the configuration read from config.yaml
//
module.exports = function (router, config) {
    // A basic GET 
    router.get('/example', example);

    // You can also have put, post, etc on the same path as the GET
    router.put('/example', example);

    // Path parameters are also possible
    //router.get('/:ver/ref/corpus/nlc/:nlc', getNlc);
    //router.get('/:ver/ref/corpus/stanox/:stanox', getStanox);

};

/*
 * Example end point that just responds with a json object
 * 
 *  req     The inbound request
 *  res     The response
 *  next    Optional callback to use if chaining handlers, can usually be ignored
 */
function example(req, res, next) {

    // set response headers, here tell a cache to cache the response for 2 hours
    res.setHeader('Cache-Control', 'public, max-age=7200, s-maxage=7200');

    // Return a simple JSON response
    res.status(200)
            .json({
                code: 200,
                message: "Example completed"
            });
}



