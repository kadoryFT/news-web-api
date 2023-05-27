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

  const jsondata = json.stringify(data);
  const url ="https://us21.api.mailchimp.com/3.0/lists/dba3c15b38"
  const Option ={
    method: "POST",
    auth : "kadory:17b8248cbbae1c7019a60bbf50ff4df2-us21"
  }
https.request(url , Option ,function(response){
response.on("data", function(data){
console.log(JSON.parse(data));
 })
})
  
});
app.listen(3000 , () => {
    console.log("yay");
    });
    //api key
    //17b8248cbbae1c7019a60bbf50ff4df2-us21


    //dba3c15b38.
    //list id