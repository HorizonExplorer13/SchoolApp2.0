import React, { useState } from 'react';
import axios from 'axios';
import StudentData from '../Model/StudentData'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentCreateForm() {
  const [studentData, setStudentData] = useState(new StudentData('', '', '', '', '', '', ''));
  const Nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:44339/api/Students/Create', studentData);
      if(response.status == 200){
        Nav(`/studentlist`);
        setStudentData(new StudentData('', '', '', '', '', '', ''))
      }
      console.log(response.data); 
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Nuevo Estudiante</h2>
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className='col-md-6'>
          <label className='form-label' htmlFor="name">Nombre:</label>
          <input className='form-control' type="text" name="name" value={studentData.name} onChange={handleInputChange} required/>
        </div>
        <div className='col-md-6'>
          <label className='form-label' htmlFor="surname">Apellido:</label>
          <input className='form-control' type="text" name="surname" value={studentData.surname} onChange={handleInputChange} />
        </div>
        <div className='col-md-2'>
          <label className='form-label' htmlFor="age">Edad:</label>
          <input className='form-control' type="number" name="age" value={studentData.age} onChange={handleInputChange} />
        </div>
        <div className='col-md-4'>
          <label className='form-label' htmlFor="phone">Telefono:</label>
          <input className='form-control' type="text" name="phone" value={studentData.phone} onChange={handleInputChange} />
        </div>
        <div className='col-md-6'>
          <label className='form-label' htmlFor="document">Documento:</label>
          <input className='form-control' type="number" name="document" value={studentData.document} onChange={handleInputChange} />
        </div>
        <div className='col-12'>
          <label className='form-label' htmlFor="direction">Dirección:</label>
          <input className='form-control' type="text" name="direction" value={studentData.direction} onChange={handleInputChange} />
        </div>
        <button className='btn btn-primary' type="submit">Crear</button>
      </form>
    </div>
  );
}

export default StudentCreateForm;