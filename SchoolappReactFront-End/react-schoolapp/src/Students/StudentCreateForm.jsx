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
    <div>
      <h2>Nuevo Estudiante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="document">Documento:</label>
          <input type="number" name="document" value={studentData.document} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" value={studentData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="surname">Apellido:</label>
          <input type="text" name="surname" value={studentData.surname} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input type="number" name="age" value={studentData.age} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="direction">Dirección:</label>
          <input type="text" name="direction" value={studentData.direction} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="phone">Telefono:</label>
          <input type="text" name="phone" value={studentData.phone} onChange={handleInputChange} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default StudentCreateForm;