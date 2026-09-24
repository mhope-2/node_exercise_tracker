const User = require('./models/users.model')
const Exercise = require("./models/exercise.model");

const express = require('express')
const app = express()

const mongoose = require('mongoose')


const run = async () => {
  // AdminJS v7 and its adapters are ESM-only, so they must be loaded with import()
  const { default: AdminJS } = await import('adminjs')
  const { default: AdminJSExpress } = await import('@adminjs/express')
  const AdminJSMongoose = await import('@adminjs/mongoose')
  AdminJS.registerAdapter({ Resource: AdminJSMongoose.Resource, Database: AdminJSMongoose.Database })

  await mongoose.connect('mongodb+srv://mhope:mhope@cluster1.330al.mongodb.net/cluster1_db?retryWrites=true&w=majority').then(()=>{
    console.log(`MongoDB database connection established Successfully`);
    }).catch((error)=>{
        console.log("MongoDB not connected");
        console.log(error);
    });

  const admin = new AdminJS({
    databases: [mongoose],
    resources: [User, Exercise],
    rootPath: '/admin',
  })

  await admin.initialize()
  const router = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, router)
}
run()

app.listen(8080, () => console.log('AdminJS is running at localhost:8080/admin'))




















