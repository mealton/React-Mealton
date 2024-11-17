import Axios from "axios";
import {APIKEY} from "./apiKey";

const axios = Axios.create({
    withCredentials: true,
    baseURL: "https://api.mealton.ru/site/",
    headers: {
        "API-Key": APIKEY
    }
});

export const api = {
    literature: {
        url: "literature/",
        getAll() {
            return axios
                .get(this.url)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        getOne(lyricId) {
            return axios
                .get(this.url + `?id=${lyricId}`)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        updateViews(lyricId) {
            return axios
                .patch(this.url, {method: "updateViews", lyricId: lyricId})
                .catch(error => console.error(error))
        },
        updateLikes(lyricId, dislike = false) {
            return axios
                .patch(this.url, {method: "updateLikes", lyricId: lyricId, dislike: dislike})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        setComment(comment) {
            return axios
                .post(this.url, {method: "setComment", comment: comment})
                .then(response => response.data)
                .catch(error => console.error(error))
        }
    },

    gallery: {
        url: "gallery/",
        getImages(albumId, page, limit) {
            return axios
                .get(this.url + `?album=${albumId}&page=${page}&limit=${limit}`)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        getImage(id) {
            return axios
                .get(this.url + `?id=${id}`)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        getAlbums() {
            return axios
                .get(this.url)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        updateViews(imageId) {
            return axios
                .patch(this.url, {method: "updateViews", imageId: imageId})
                .catch(error => console.error(error))
        },
        updateLikes(imageId, dislike = false) {
            return axios
                .patch(this.url, {method: "updateLikes", imageId, dislike})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        setComment(comment) {
            return axios
                .post(this.url, {method: "setComment", comment: comment})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        uploadImage(image) {
            return axios
                .post(this.url, {method: "uploadImage", image})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        getHahtagImages(hashtag) {
            return axios
                .get(this.url + `?hashtag=${hashtag}`)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        addSub(title, parent) {
            return axios
                .post(this.url, {title, parent, method: "add_sub"})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
    },

    music: {
        url: "music/",
        all(albumId) {
            return axios
                .get(this.url + "?albumId=" + albumId)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        one(id, albumId) {
            return axios
                .get(this.url + `?id=${id}&albumId=${albumId}`)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        radio(radio) {
            return axios
                .post(this.url, {method: "radio", radio})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        updateLikes(musicId, dislike) {
            return axios
                .patch(this.url, {method: "updateLikes", musicId, dislike})
                .then(response => response.data)
                .catch(error => console.error(error))
        }
    },

    admin: {
        url: "admin/",
        auth(authId) {
            return axios
                .get(this.url + "?method=auth&authId=" + authId)
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        login(loginData) {
            return axios
                .post(this.url, {method: "login", loginData})
                .then(response => response.data)
                .catch(error => console.error(error))
        },
        gallery: {
            url: "admin/",
            init(albumId, page) {
                return axios
                    .get(this.url + "?object=gallery&method=getAll&albumId=" + albumId + "&page=" + page)
                    .then(response => response.data)
                    .catch(error => console.error(error))
            },
            getImage(imageId) {
                return axios
                    .get(this.url + "?object=gallery&method=getImage&imageId=" + imageId)
                    .then(response => response.data)
                    .catch(error => console.error(error))
            },
            updateImage(image) {
                console.log(image);
                return axios
                    .patch(this.url, {object: "gallery", method: "updateImage", image})
                    .then(response => response.data)
                    .catch(error => console.error(error))
            },
            setImageStatus(imageId, status, page) {
                return axios
                    .patch(this.url, {object: "gallery", method: "setImageStatus", imageId, status, page})
                    .then(response => response.data)
                    .catch(error => console.error(error))
            },
            delete(imageId, albumId, page) {
                return axios
                    .delete(this.url + "?object=gallery&method=delete&imageId=" + imageId + "&albumId=" + albumId + "&page=" + page)
                    .then(response => response.data)
                    .catch(error => console.error(error))
            },
        },
    }
};