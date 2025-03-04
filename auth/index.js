const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5030
const app = express()

app.use(express.json())
app.use('/auth', authRouter)


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://tsaloevsarmat:5xu5Cl5DEoumeNSj@cluster0.a1dtq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        app.listen(PORT, () => console.log(`server started at port ${PORT}`))

    } catch (err) {
        console.log(err)
    }
}

start()




 