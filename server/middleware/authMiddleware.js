// create a protect function


// if there is authorisation in headers and it starts with bearer then try: 
// Get token from header, then verify jwt token, then get user from the token and assign it to req.user, then call next()
//  if smth is wrong => not authorised


    // If first if is not run, then nothing was assigned to token variable and it means that someone not authenticated
    // is trying to access protected routes