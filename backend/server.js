const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

let reservations = []

// Get all reservations
app.get("/reservations", (req, res) => {
    res.json(reservations)
})

// Create reservation
app.post("/reservations", (req, res) => {
    const { name, email, time } = req.body

    if (!name || !email || !time) {
        return res.status(400).json({ message: "All fields required" })
    }

    const exists = reservations.find(r => r.time === time)

    if (exists) {
        return res.status(409).json({ message: "Time slot already booked" })
    }

    const reservation = {
        id: Date.now(),
        name,
        email,
        time
    }

    reservations.push(reservation)

    res.status(201).json(reservation)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
