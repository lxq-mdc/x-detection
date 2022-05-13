import axios from "axios";
import { Message } from "element-ui";
export default function ajax(url, data = {}, type = "POST") {
    return new Promise((resolve, reject) => {
        let promise;
        if (type === "GET") {
            promise = axios.get(url, {
                params: data,
            });
        } else {
            promise = axios.post(url, data);
        }
        promise
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
                Message.error("请求出错了: " + error.message);
            });
    });
}