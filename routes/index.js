var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
/* GET home page. */
const passport = require('passport');
const upload = require('./multer');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
// Middleware to make user available to all templates
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  // console.log(req.flash("error"));

  res.render('login', {error : req.flash("error")});
});
router.get('/feed', async function(req, res, next) {
  try {
    const q = (req.query.q || '').trim();
    let filter = {};
    if (q.length > 0) {
      // Escape regex special characters in q to avoid regex injection
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter = { postText: { $regex: escaped, $options: 'i' } };
    }

    const posts = await postModel.find(filter).populate('user');
    res.render('feed', { posts, q });
  } catch (err) {
    next(err);
  }
});
router.post('/upload',isLoggedIn, upload.single("file"),async function(req, res, next) {
  if(!req.file){
    return res.status(404).send("no files were given");
  }
  //the file that is uploaded is saved as a post and it;s postid 
  //is given to user and user id is given to post 
  // res.send("file uploaded successfully");
  const user = await userModel.findOne({username : req.session.passport.user});
  const post = await postModel.create({
    image : req.file.filename,
    postText : req.body.filecaption,
    user : user._id,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});
router.get('/profile',isLoggedIn,async function(req,res){
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  .populate('posts');
  console.log(user);
  res.render('profile',{user});
}); 

router.post('/register',function(req,res,next){
  console.log('POST /register hit, body:', req.body);
  // const userData = ({
  //   username : req.body.username,
  //   password : req.body.password,
  //   email : req.body.email,
  //   fullname : req.body.fullname,
  // }) this code reduced by gpt now below
  const {username, email, fullname} = req.body;
  const userData = new userModel({username, email, fullname});
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
  .catch(function(err){
    console.error('Error registering user:', err);
    return next(err);
  })
})
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout',function(req,res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/login');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

router.post('/post/delete/:id', isLoggedIn, async function(req, res) {
  try {
    const post = await postModel.findById(req.params.id);
    
    // Check if post exists and belongs to current user
    if (!post || post.user.toString() !== req.user._id.toString()) {
      req.flash('error', 'Not authorized to delete this post');
      return res.redirect('/profile');
    }

    // Remove post from user's posts array
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { posts: post._id }
    });

    // Delete the post
    await postModel.findByIdAndDelete(req.params.id);

    res.redirect('/profile');
  } catch (error) {
    console.error('Error deleting post:', error);
    req.flash('error', 'Error deleting post');
    res.redirect('/profile');
  }
});

module.exports = router;
