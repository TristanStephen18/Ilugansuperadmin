const express = require('express');
const app = express();
const path = require('path');

const imagesdir = path.join(__dirname, 'images');
const scriptdir = path.join(__dirname, 'scripts');
const viewsdir = path.join(__dirname, "views");
const cssdir = path.join(__dirname, 'css');
console.log(imagesdir);

app.listen(5000, ()=>{
    console.log('Server is listening at http://localhost:5000/');
})

app.get(['/', '/index'], (req, res)=>{
    res.sendFile(path.join(viewsdir, 'index.html'));
});

app.get('/mobileusers', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'mobileusers.js'));
})

app.get('/requests', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'requests.html'));
});

app.get('/mobile', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'mobileusers.html'));
});
app.get('/dashboard', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'dashboard.html'));
});

app.get('/idrequests', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'idvalidate.html'));
});

app.get('/subscriptions', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'sales.html'));
});

app.get('/buscompanies', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'companies.html'));
});

app.get('/notifications', (req, res)=>{
    res.sendFile(path.join(viewsdir, 'notification.html'));
});

//scripts
app.get('/reqjs', (req, res)=>{
    res.sendFile(path.join(__dirname, 'scripts', 'requests.js'));
});

app.get('/loginchecker', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'auth.js'));
});
app.get('/dashboardjs', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'dashboard.js'));
});

app.get('/getcompanies', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'companies.js'));
});

app.get('/notificationsjs', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'notifications.js'));
});

app.get('/displaynotifs', (req, res)=>{
    res.sendFile(path.join(scriptdir, 'displaynotifs.js'));
});


app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'scripts', 'login.js'));
});

app.get('/logo', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'logo.png'));
});


//css
app.get('/indexcss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'index.css'));
});

app.get('/dashboardcss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'dashboard.css'));
});

app.get('/companiescss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'companies.css'));
});

app.get('/mobileuserscss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'mobileusers.css'));
});
app.get('/notificationscss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'notifications.css'));
});

app.get('/idvalidatecss', (req, res)=>{
    res.sendFile(path.join(cssdir, 'idvalidation.css'));
});


//images
app.get('/company', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'comp.png'));
});

app.get('/log', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'log.png'));
});

app.get('/logbg', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'logbg.png'));
});

app.get('/logo', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'logo.png'));
});

app.get('/sales', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'sales.png'));
});

app.get('/user', (req, res)=>{
    res.sendFile(path.join(imagesdir, 'user.png'));
});