import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

var listPosts =[];
var currentlyEdited = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: listPosts});
});

app.get("/createPost", (req, res) => {
    res.render("createPost.ejs");
});

app.get("/deletePost",(req,res)=>{
    res.render("deletePost.ejs",{posts:listPosts});
});

app.get("/updatePost",(req,res)=>{
    res.render("updatePost.ejs",{
        formOption: "Choose a Post",
        posts: listPosts,
    });
});

app.post("/editPost",(req,res)=>{
    const blogSearch =  req.body.postChooseRadio;
    console.log(blogSearch);
    let blogToDisplay = "";
    listPosts.forEach((value)=>{
        if(value.title==blogSearch){
            blogToDisplay = value;
            currentlyEdited = value;
        }
    });
    //console.log(blogToDisplay);
    res.render("updatePost.ejs",
        {
            post:blogToDisplay,
        }
    );
});

app.post("/postEdited",(req,res)=>{
    const newTitle = req.body.blogTitle;
    const newText = req.body.blogText;
    listPosts.forEach((value)=>{
        if(value==currentlyEdited){
            value.title= newTitle;
            value.text = newText;
        }
    });
    res.render("index.ejs",{
        postCreated:"Post was edited!",
        posts:listPosts,
    });
});

app.post("/createPost",(req,res)=>{
    listPosts.push({title: req.body.blogTitle,text: req.body.blogText,});

    res.render("index.ejs",{
        postCreated:"Post was created!",
        posts:listPosts,
    });
});

app.post("/deletePost",(req,res)=>{
    const postToDelete = req.body.postDeleteRadio;
    let indexRemove = 0;
    listPosts.forEach((value,index)=>{
        if(value.title==postToDelete){
            indexRemove=index;
        }
    });
    listPosts.splice(indexRemove,1);
    res.render("index.ejs",{
        posts: listPosts,
    });
});

app.get("/viewPost/:blog",(req,res)=>{
    const blogSearch = req.params.blog;
    let blogToDisplay = "";
    listPosts.forEach((value)=>{
        if(value.title==blogSearch){
            blogToDisplay = value;
        }
    });
    if(blogToDisplay!=""){
        res.render("displayBlog.ejs",{
            post: blogToDisplay,
        });
    }
    else{
        res.send("oops");
    }
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});