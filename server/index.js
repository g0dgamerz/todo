const express = require('express')
const port = 2000;
const fs = require('fs');
const app = express();
const cors = require('cors')
// const md5 =require('md5')
const bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

//user validation only
app.post('/login', urlencodedParser, async (req, res) => {
    const username = req.body.username
    const hpwd = req.body.hash
    console.log(username, hpwd)
var ch=false
    // console.log(req.query.username)
    try {
        fs.readFile(__dirname + "/accounts.csv", "utf8", (error, data) => {
            if (error) throw error
            if (data) {
                const arr = data.split('\n');
                for (let i = 0; i < arr.length; i++) {
                    var newData = arr[i].split(',');
                    if (username === newData[0] && hpwd === newData[1]) {
                        res.json({
                            'status': 200,
                            'msg': 'Login user name and paswword match'
                        })
                    ch = true
                    } 
                }
            }
            if(ch===false){
            res.json({
                'status': 400,
                'msg': "Login user name and paswword didn't match"
            })
        }
        })

        // console.log(__dirname+`/${username}.csv`)
    } catch (error) {
        console.log(error)
    }
})
//return list according to username
app.get('/get', (req, res) => {
    var jsondata = {
        data: []
    }
    const usr = req.query.usr
    console.log(usr)
    if (fs.existsSync(__dirname + `/${usr}.csv`)) {
        fs.readFile(__dirname + `/${usr}.csv`, 'utf8', (err, data) => {
            if (err) throw err;
            if (data) {
                const arr = data.split('\n');
                arr.forEach(value => {
                    if (value !== "") {
                        let data = value.split(',');
                        // let data=value.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
                        let title = data[0];
                        let flag = data[1];
                        jsondata.data.push({
                            'title': title,
                            'flag': flag
                        });
                    }
                });
                console.log(jsondata.data[0].title)
                res.json(jsondata.data)
            }
            else console.log('empty files');
        })
    } else {
        console.log("there is no file")
    }

});
app.get('/check', (req, res) => {
    fs.readFile(__dirname + "/jidesh.csv", "utf8", (err, data) => {
        if (err) throw err
        if (data) {
            var i = 0;
            const el = [];
            const arr = data.split('\n')

            arr.map(Element => {
                if (Element !== "") {
                    el[i] = Element
                    i++
                }
            })
            res.json(el);
        }
    })
})
app.post('/save', urlencodedParser, async (req, res) => {// post save
    const list = req.body.newList
    const usr = req.body.username
    console.log(usr)
    // if (fs.existsSync(__dirname + `/${usr}.csv`)) {
        fs.appendFile(__dirname + `/${usr}.csv`, `${list},0\n`, (err) => {
            if (err) throw err;
            else res.json({
                'status': 200,
                'msg': 'Saving Sucessfull'
            });
        })
    // } else {
    //     console.log("there is no file")
    //     res.json({
    //         'status': 400,
    //         'msg': 'server did not found files for the user'
    //     })
    // }
});// post save
app.post('/reg', urlencodedParser, async (req, res) => {//post registration 
    const usr = req.body.username
    const hpwd = req.body.hash
    console.log(usr, hpwd)
    if (fs.existsSync(__dirname + `/accounts.csv`)) {// main if
        fs.readFile(__dirname + "/accounts.csv", "utf8", (error, data) => {//fs file read
           var ch=false;
            if (error) throw error
            if (data) {//if data comes
                //checking user name duplication
                const arr = data.split('\n');
                for (let i = 0; i < arr.length; i++) { //looping to array if data
                    var newData = arr[i].split(',');// splitting by ','
                    if (usr === newData[0]) { //if user match
                        res.json({
                            'status': 400,
                            'msg': 'UserName is Already Exits!!!!'
                        })
                        ch=true;

                    }//end if user match 
                    else { // else user
                        /////
                        
                    }//end else user
                }//end for loop
                if(ch!==true){ //if ch
                fs.appendFile(__dirname + `/accounts.csv`, `\n${usr},${hpwd}`, (err) => { //file data append
                    if (err) throw err; // if error occure
                    else { //else 
                        res.json({
                            'status': 200,
                            'msg': 'Account Created Sucessfull',
                        });
                    } // end of else
                });//end file data append
            }//end of if ch
            }//end-if data comes
        });//end of fs file read
    }//end of if
});// end of post registration 


app.get('/delete',(req,res) =>{
    var datas=[]
    const usr = req.query.usr
    const idx= req.query.idx
    console.log(usr)
    fs.readFile(__dirname + `/${usr}.csv`,'utf8',(err,data)=>{
        if(err) throw err;
        if(data){
            const arr = data.split('\n');
            var i=0;
            arr.forEach((value,id)=>{
                datas[i]=value;
                i++;
            });
            fs.unlink(__dirname + `/${usr}.csv`,function (err){
                console.log(err)
            })
            datas.splice(idx,1)
            datas.forEach(value=>{
                fs.appendFile(__dirname + `/${usr}.csv`,value+'\n',err=>{
                    console.log(err)
                });
            })
            res.json({
                'status':200,
                'msg':"deleted sucessful"
            });
        }
        else console.log('empty files');
    })
})     


app.listen(port, () => console.log('server is up and running'))