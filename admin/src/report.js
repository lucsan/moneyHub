const holdingValue = (total, percent) => {
  return total * percent
}

const holdingName = (id, companies) => {
  return companies.filter((cmp) => cmp.id === id)[0].name
}

const csvMap = (a) => {
  const c = []
  for (const i of a) {
    i.holdings.map((s) => {
      const o = {}
      o.User = i.userId
      o.FirstName = i.firstName
      o.LastName = i.lastName
      o.Date = i.date
      o.Holding = s.holdingName
      o.Value = s.value
      c.push(o)
    })
  }
  return c
}

const csvMapToString = (c) => {
  let csvString = ""
  for (const i of c) {
    const keys = Object.keys(i)
    const baseString = keys.reduce((a, k) => a += `${i[k]},`, "")
    const line = baseString.substring(0, baseString.length - 1) + "\n"
    csvString += line
  }
  return csvString
}
const csvReport = (holdings, companies) => {
  const holdingsData = holdings.map((holding) => {
    const holdingData = holding.holdings.map((h) => {
      h.holdingName = holdingName(h.id, companies)
      h.value = holdingValue(holding.investmentTotal, h.investmentPercentage)
      return h
    })
    holding.holdings = holdingData
    return holding
  })
  const csvArray = csvMap(holdingsData)
  const csv = csvMapToString(csvArray)
  return csv
}

exports.csvMap = csvMap
exports.csvMapToString = csvMapToString
exports.holdingName = holdingName
exports.holdingValue = holdingValue
exports.csvReport = csvReport
