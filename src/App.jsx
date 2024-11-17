import React, {useEffect} from 'react';
import './assets/css/App.css';
import Header from "./components/Header/Header";
import IndexPage from "./Pages/IndexPage/IndexPage";
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import LiteraturePage from "./Pages/LiteraturePage/LiteraturePage";
import 'font-awesome/css/font-awesome.min.css';
import GalleryPage from "./Pages/GalleryPage/GalleryPage";
import MusicPage from "./Pages/MusicPage/MusicPage";
import AdminPage from "./Pages/AdminPage/AdminPage";

const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<IndexPage/>}/>
                <Route path="/literature/:id?" element={<LiteraturePage/>}/>
                <Route path="/gallery/:album?/:id?" element={<GalleryPage/>}/>
                <Route path="/music/:albumId?" element={<MusicPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </>
    );
};

export default App;