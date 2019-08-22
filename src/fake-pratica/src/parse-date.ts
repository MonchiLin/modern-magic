import {Maybe, Nothing, Just} from "./maybe";

const parseDate = (date: string) =>
    Maybe(date)
        .map(d => new Date(d))
        .chain(d => Number.isNaN(d.valueOf()) ? Nothing.of(null) : Just.of(d))

export {
    parseDate
}