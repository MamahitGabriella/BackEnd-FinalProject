import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">Ekstrakurikuler Siswa SMA Negeri 2 Bitung</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse, justify-content-end" id="navbarNavAltMarkup" className="">
        <div className="navbar-nav">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/">Logout</Link>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default NavBar;
