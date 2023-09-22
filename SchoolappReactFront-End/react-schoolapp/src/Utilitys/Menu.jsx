import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Here we create inside a function a bar that contains a menu with the fundamental pages from the app. 
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
      <Link className="navbar-brand" to="/">Inicio</Link>
      <button className="navbar-toggler" type="button"
              data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">       
                <li className="nav-item">
                  <Link className="nav-link" to="/studentlist">Estudiantes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/subjectlist">Materias</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/professorslist">Profesores</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/studentsubjectlist">Asignaciones</Link>
                </li>
            </ul>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;