
import ajax from './ajax'
const BASE_URL ='http://8.130.52.209:8888'
export const upload=(projectName,uploadNames)=>ajax(BASE_URL+'/work/publish',{projectName,uploadNames})
export const getItems=()=>ajax(BASE_URL+'/work',{},'GET')
