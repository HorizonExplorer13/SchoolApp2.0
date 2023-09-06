import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentData from '../Model/StudentData'; 
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Utilitys/Forms.css';
import { ValidatateDoc, ValidatePhoneN, ValidationNames, ValidationSurnames } from '../Utilitys/Validations';

function StudentUpdateForm({refreshStudentList}) {
  const Nav = useNavigate();
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(new StudentData('', '', '', '', '', '', ''));
  const [errorD,setErrorD] = useState("");
  const [Error,setError] = useState({
    name: "",
    surname:"",
    doc:"",
    phone:"",
  });

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

    const validatename = ValidationNames(studentData.name);
    const validatesurname = ValidationSurnames(studentData.surname);
    const validateDoc = ValidatateDoc(studentData.document);
    const validatePhone = ValidatePhoneN(studentData.phone);

    const newErrors = {
      name: validatename,
      surname: validatesurname,
      doc: validateDoc,
      phone: validatePhone,
    };
    setError(newErrors);

    const errorValues = Object.values(newErrors);

    if(errorValues.every(error => error == '' || error == null)){
      try {
        const response = await axios.put(`https://localhost:44339/api/Students/Update/${studentId}`, studentData);
        if(response.status == 200){
          Nav('/studentlist'); 
          refreshStudentList();
        } 
      } catch (error) {
        console.error('Error updating student:', error);
        //setError('There was an error updating the student.');
        if (error.response && error.response.status == 409) {
          setErrorD('Actualmente ya hay un estudiante con esta informacion');
      } else {
        //setError('Something went wrong while sending the data.');
        console.log('Something went wrong while sending the data.');
    }

      }

    }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      {errorD && <p style={{ color: 'red' }}>{errorD}</p>}
      <h2>Actualizar Estudiante</h2>   
      <form className='row g-3' onSubmit={handleUpdate}> 
      <div className={`col-md-6 form-group ${Error.name !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="name">Nombre:</label>
          <input className={`form-control ${Error.name !== '' ? 'error-input-field' : ''}`}  type="text" name="name" value={studentData.name} onChange={handleInputChange} />
          {Error.name && <div className='error-message'>{Error.name}</div>}
        </div>
        <div className={`col-md-6 form-group ${Error.surname !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="surname">Apellido:</label>
          <input className={`form-control ${Error.surname !== '' ? 'error-input-field' : ''}`} type="text" name="surname" value={studentData.surname} onChange={handleInputChange} />
          {Error.surname && <div className='error-message'>{Error.surname}</div>}
        </div>
        <div className='col-md-2'>
          <label className='form-label' htmlFor="age">Edad:</label>
          <input className='form-control' type="number" name="age" value={studentData.age} onChange={handleInputChange} />
        </div>
        <div className={`col-md-4 form-group' ${Error.phone !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="phone">Telefono:</label>
          <input className={`form-control ${Error.phone !== '' ? 'error-input-field' : ''}`} type="text" name="phone" value={studentData.phone} onChange={handleInputChange} />
          {Error.phone && <div className='error-message'>{Error.phone}</div>}
        </div>
        <div className={`col-md-6 form-group' ${Error.doc !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="document">Documento:</label>
          <input className={`form-control ${Error.doc !== '' ? 'error-input-field' : ''}`} type="number" name="document" value={studentData.document} onChange={handleInputChange} />
          {Error.doc && <div className='error-message'>{Error.doc}</div>}
        </div>
        <div className='col-md-12'>
          <label className='form-label' htmlFor="direction">Direccion:</label>
          <input className='form-control' type="text" name="direction" value={studentData.direction} onChange={handleInputChange} />
        </div>
        <button className='btn btn-primary' type="submit" >Actualizar</button>
      </form>
    </div>
  );
}

export default StudentUpdateForm;