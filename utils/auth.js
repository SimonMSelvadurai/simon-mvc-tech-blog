// middleware  to verify  user logged in before restricted route access

const withAuth =(req, res, next) => {
    console.log("withAuth Line 1 ------------- > ");

    if(!req.session.user_id) {
        res.redirect('/login');
    }else{
        console.log("withAuth");
        next();
    }
};

module.exports = withAuth;