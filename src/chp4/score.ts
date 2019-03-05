import _ from "underscore"
import * as R from "ramda"

const data = [
    {name: "码数", sex: "male"},
    {name: "全单", sex: "male"},
    {name: "晓红", sex: "female"},
]

const res = _.chain(data)
    .filter(d => d.sex === "male")
    .map(d => d.name)
    .value()


const getMaleName = R.compose(
    R.map(d => d.name),
    R.filter(d => d.sex === "male")
)

console.log("getMaleName(data)", getMaleName(data))



