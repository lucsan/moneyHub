const {csvReport, holdingValue, holdingName} = require("./report")
const investmentsStub = require("../../investments/src/data.json")
const companiesStub = require("../../financial-companies/src/data.json")

const csvStringStub = `1,Billy,Bob,2020-01-01,The Small Investment Company,1400
2,Sheila,Aussie,2020-01-01,The Big Investment Company,10000
2,Sheila,Aussie,2020-01-01,The Small Investment Company,10000
1,Billy,Bob,2020-02-01,The Small Investment Company,1300
2,Sheila,Aussie,2020-02-01,The Big Investment Company,11000
2,Sheila,Aussie,2020-02-01,The Small Investment Company,11000
1,Billy,Bob,2020-03-01,The Small Investment Company,12000
2,Sheila,Aussie,2020-03-01,The Big Investment Company,10750
2,Sheila,Aussie,2020-03-01,The Small Investment Company,6450
2,Sheila,Aussie,2020-03-01,Capital Investments,4300
3,John,Smith,2020-03-01,The Big Investment Company,120000
3,John,Smith,2020-03-01,Capital Investments,30000
`

const testHoldingName = () => {
  // Act
  const companyName = holdingName("2", companiesStub)
  // Assert
  console.log("test holdingName", companyName === "The Small Investment Company")
}

const testHoldingValue = () => {
  // Arrainge
  const total = 100
  const percentage = 0.25
  // Act
  const r = holdingValue(total, percentage)
  // Assert
  console.log("test holdingValue", r === 25)
}

const testCsvReport = () => {
  // Act
  const csv = csvReport(investmentsStub, companiesStub)
  // Assert
  console.log("test csvReport", csv === csvStringStub)
}

testHoldingValue()
testHoldingName()
testCsvReport()
