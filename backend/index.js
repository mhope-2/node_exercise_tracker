const User = require('./models/users.model')
const Exercise = require("./models/exercise.model");

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

const express = require('express')
const app = express()

const AdminJSMongoose = require('@adminjs/mongoose')
const mongoose = require('mongoose')
AdminJS.registerAdapter({ Resource: AdminJSMongoose.Resource, Database: AdminJSMongoose.Database })


const run = async () => {
  await mongoose.connect('mongodb+srv://mhope:mhope@cluster1.330al.mongodb.net/cluster1_db?retryWrites=true&w=majority').then(()=>{
    console.log(`MongoDB database connection established Successfully`);
    }).catch((error)=>{
        console.log("MongoDB not connected");
        console.log(error);
    });

  const admin = new AdminJS({
    databases: [mongoose.connection],
    resources: [User, Exercise],
    rootPath: '/admin',
  })

  await admin.initialize()
  const router = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, router)
}
run()

app.listen(8080, () => console.log('AdminJS is running at localhost:8080/admin'))




















