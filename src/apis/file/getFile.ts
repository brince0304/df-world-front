import createInstance from "../index";

export default async function getFile(url:string) {
    return await createInstance.get(url);
}