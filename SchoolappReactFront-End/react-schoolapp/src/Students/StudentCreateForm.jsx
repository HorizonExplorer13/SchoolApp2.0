import React, { useState } from 'react';
import axios from 'axios';
import StudentData from '../Model/StudentData'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Utilitys/Forms.css';
import { ValidatateDoc, ValidatePhoneN, ValidationNames, ValidationSurnames } from '../Utilitys/Validations';

function StudentCreateForm() {
  const [studentData, setStudentData] = useState(new StudentData('', '', '', '', '', '', ''));
  const Nav = useNavigate();
  const [errorD,setErrorD] = useState();
  const [Error,setError] = useState({
    name: "",
    surname:"",
    doc:"",
    phone:"",
  });
  

  const handleSubmit = async (e) => {
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

   
    if (errorValues.every(error => error == '' || error == null)) {
      try {
        const response = await axios.post('https://localhost:44339/api/Students/Create', studentData);
        if(response.status == 200){
          Nav(`/studentlist`);
          setStudentData(new StudentData('', '', '', '', '', '', ''))
        }
        console.log(response.data); 
      } catch (error) {
        console.error('Error creating student:', error);
        if(error.response && error.response.status == 409){
          setErrorD('Actualmente ya hay un estudiante con esta informacion');
          console.log('Actualmente ya hay un estudiante con esta informacion');
        }else{
          setErrorD('hubo un error creando al estudiante');
        }      
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
    setError({ ...Error, [name]: '' });
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      {errorD && <p style={{ color: 'red' }}>{errorD}</p>}
      <h2>Nuevo Estudiante</h2>
      <form className='row g-3' >
        <div className={`col-md-6 form-group ${Error.name !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="name">Nombre:</label>
          <input className={`form-control ${Error.name !== '' ? 'error-input-field' : ''}`} type="text" name="name" value={studentData.name} onChange={handleInputChange} required/>
          {Error.name && <div className='error-message'>{Error.name}</div>}
        </div>
        <div className={`col-md-6 form-group ${Error.surname !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="surname">Apellido:</label>
          <input className={`form-control ${Error.surname !== '' ? 'error-input-field' : ''}`} type="text" name="surname" value={studentData.surname} onChange={handleInputChange} required/>
          {Error.surname && <div className='error-message'>{Error.surname}</div>}
        </div>
        <div className='col-md-2'>
          <label className='form-label' htmlFor="age">Edad:</label>
          <input className='form-control' type="number" name="age" value={studentData.age} onChange={handleInputChange} required/>
        </div>
        <div className={`col-md-4 form-group' ${Error.phone !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="phone">Telefono (fijo o movil):</label>
          <input className={`form-control ${Error.phone !== '' ? 'error-input-field' : ''}`} type="text" name="phone" value={studentData.phone} onChange={handleInputChange} required/>
          {Error.phone && <div className='error-message'>{Error.phone}</div>}
        </div>
        <div className={`col-md-6 form-group' ${Error.doc !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="document">Documento:</label>
          <input className={`form-control ${Error.doc !== '' ? 'error-input-field' : ''}`} type="number" name="document" value={studentData.document} onChange={handleInputChange} required/>
          {Error.doc && <div className='error-message'>{Error.doc}</div>}
        </div>
        <div className='col-12'>
          <label className='form-label' htmlFor="direction">Dirección:</label>
          <input className='form-control' type="text" name="direction" value={studentData.direction} onChange={handleInputChange} required/>
        </div>
        <button className='btn btn-primary' type="submit" onClick={handleSubmit}> Crear</button>    
      </form>
    </div>
  );
}

export default StudentCreateForm;