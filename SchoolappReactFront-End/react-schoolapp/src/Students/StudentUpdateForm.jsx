import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentData from '../Model/StudentData'; 
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../Utilitys/Forms.css';

function StudentUpdateForm({refreshStudentList}) {
  const Nav = useNavigate();
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(new StudentData('', '', '', '', '', '', ''));
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener los detalles del estudiante por su ID
    axios.get(`https://localhost:44339/api/Students/GetById/${studentId}`)
      .then(response => {
        const { document, name, surname, age, direction, phone } = response.data;
        setStudentData(new StudentData(studentId, document, name, surname, age, direction, phone));
      })
      .catch(error => {
        console.error('Error fetching student details:', error);
      });
  }, [studentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:44339/api/Students/Update/${studentId}`, studentData);
      if(response.status == 200){
        Nav('/studentlist'); 
        refreshStudentList();

      } 
    } catch (error) {
      console.error('Error updating student:', error);
      setError('There was an error updating the student.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Actualizar Estudiante</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='row g-3' onSubmit={handleUpdate}>
      <div className='col-md-6'>
          <label className='form-label' htmlFor="name">Nombre:</label>
          <input className='form-control' type="text" name="name" value={studentData.name} onChange={handleInputChange} />
        </div>
        <div className='col-md-6'>
          <label htmlFor="surname">Apellido:</label>
          <input type="text" name="surname" value={studentData.surname} onChange={handleInputChange} />
        </div>
        <div className='col-md-2'>
          <label htmlFor="age">Edad:</label>
          <input type="number" name="age" value={studentData.age} onChange={handleInputChange} />
        </div>
        <div className='col-md-4'>
          <label htmlFor="phone">Telefono:</label>
          <input type="text" name="phone" value={studentData.phone} onChange={handleInputChange} />
        </div>
        <div className='col-md-6'>
          <label className='' htmlFor="document">Documento:</label>
          <input className='form-control' type="number" name="document" value={studentData.document} onChange={handleInputChange} />
        </div>
        <div className='col-md-12'>
          <label htmlFor="direction">Direccion:</label>
          <input type="text" name="direction" value={studentData.direction} onChange={handleInputChange} />
        </div>

        <button className='btn btn-primary' type="submit" >Actualizar</button>
      </form>
    </div>
  );
}

export default StudentUpdateForm;