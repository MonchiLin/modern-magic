import {ADD_ARTICLE, DECREMENT, INCREMENT} from "./constants";

export const addArticle = article => ({type: ADD_ARTICLE, payload: article})

export const increment = () => ({type: INCREMENT, payload: null})
export const decrement = () => ({type: DECREMENT, payload: null})