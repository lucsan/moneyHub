const express = require("express")
const config = require("config")
const {csvReport} = require("./report")
const http = require("http")
const app = express()

app.use(express.json({limit: "10mb"}))

const reportData = {}
const dataReady = async () => {
  if (reportData.invDone && reportData.comDone) {
    const csv = await csvReport(reportData.investments, reportData.companies)

    console.log(csv)

    const options = {
      host: "localhost",
      port: "8081",
      path: "/investments/export",
      method: "POST",
      headers: {
        "Content-Type": "text/json",
        "Content-Length": Buffer.byteLength(csv)
      },
    }

    const req = http.request(options, (res) => {
      console.log("status", res.statusCode)
    })

    req.on("error", (e) => { console.log("error", e) })

    req.write(csv)
    req.end()
  }
}

app.get("/investments/report", async (req, res) => {
  http.get(`${config.investmentsServiceUrl}/investments/`, (response) => {
    response.on("data", (d) => {
      reportData.invDone = true
      reportData.investments = JSON.parse(d.toString())
      dataReady()
    })
    response.on("error", (e) => {console.log("error", e)})
  })
  http.get(`${config.companiesServiceUrl}/companies/`, (response) => {
    response.on("data", (d) => {
      reportData.comDone = true
      reportData.companies = JSON.parse(d.toString())
      dataReady()
    })
    response.on("error", (e) => {console.log("error", e)})
  })
  res.end()
})

app.get("/investments/:id", (req, res) => {
  const { id } = req.params
  http.get(`${config.investmentsServiceUrl}/investments/${id}`, (response) => {
    response.on("data", (d) => {
      const investment = d.toString()
      res.send(investment)
    })
  })
})





app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
