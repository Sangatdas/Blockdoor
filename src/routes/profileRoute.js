var express = require('express');
var mongodb = require('mongodb').MongoClient;
var profileRouter = express.Router();

var menu = [{
        href: '/buyTokens',
        text: 'Buy SATs'
    },
    {
        href: '/sellTokens',
        text: 'Sell SATs'
    },
    {
        href: '#',
        text: 'Become a Reviewer'
    }
];

var p_router = function() {
    profileRouter.route("/")
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            } else {
<<<<<<< HEAD
                res.render('profile', {
                    title: "SmartReviewer",
                    navMenu: menu,
                    user: req.user,
                    balance: 0
                });
=======
                const url = 'mongodb://localhost:27017';
                mongodb.connect(url, { useNewUrlParser: true }, function(err, client) {
                    const db = client.db('NodeDemoWebApp');
                    const Submissions = db.collection('Submissions');

                    Submissions.find({owner:req.user._id}).toArray(function(err,ans){
                        if(err){
                            console.log(err);    
                        }
                        else{
                            res.render('profile', {
                                title: "SmartReviewer",
                                navMenu: menu,
                                user: req.user, 
                                sub : ans
                            });
                             console.log(ans);

                        }    
                    });    
                });          
>>>>>>> 94b6b587b57a998f8fdc422f470ec7edf34054a7
            }
        });


    return profileRouter;
}
module.exports = p_router;