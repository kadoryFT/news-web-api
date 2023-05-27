const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded());

app.use("/public", express.static("public"));

app.get("/" , (req, res ) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" ,function(req ,res){
    const firstName = req.body.fName;
    const lastName  = req.body.lName;
    const Email = req.body.email;
  const data = {
    member:[{
        email_address: Email,
        status:"subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
     }
    ]
  };

  const jsondata = JSON.stringify(data);
  const url ="https://us21.api.mailchimp.com/3.0/lists/dba3c15b38"
  const Option ={
    method: "POST",
    auth : "kadory1:26d1f5f9ee21af9e9ab821d8b87e8473-us21"
  };
const request= https.request(url , Option ,function(response){
    if (response.statusCode ==200){
        res.sendFile(__dirname +"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data", function(data){
console.log(JSON.parse(data));
 })
})
  request.write(jsondata);
  request.end();
});
app.post("/failure", function(req, res){
    res.redirect("/")
});
app.post("/success", function(req, res){
    res.redirect("/")
});
app.listen(process.env.PORT || 3000 , () => {
    console.log("yay");
    });
   


    