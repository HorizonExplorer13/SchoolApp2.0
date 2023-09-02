import React, { useState } from 'react';
import axios from 'axios';
import StudentData from '../Model/StudentData'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ValidatateDoc, ValidatePhoneN, ValidationNames } from '../Utilitys/Validations';

function StudentCreateForm() {
  const [studentData, setStudentData] = useState(new StudentData('', '', '', '', '', '', ''));
  const Nav = useNavigate();
  const [Error,setError] = useState({
    name: "",
    surname:"",
    doc:"",
    phone:"",
  });
  const [alertMessages, setAlertMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validatename = ValidationNames(studentData.name);
    const validatesurname = ValidationNames(studentData.surname);
    const validateDoc = ValidatateDoc(studentData.document);
    const validatePhone = ValidatePhoneN(studentData.phone);

    const newErrors = {
      name: validatename,
      surname: validatesurname,
      doc: validateDoc,
      phone: validatePhone,
    };
    setError(newErrors);

    const newAlertMessages = Object.values(newErrors).filter((error) => error !== '');
    setAlertMessages(newAlertMessages);
    if (newAlertMessages.length == 0 ) {
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
    }else {
    alert( newAlertMessages.join('\n'));
    if (window.confirm(newAlertMessages)) {
      resetalert();
    } else {
      resetalert();
    }
  }
  }

  const resetalert = () =>{
    setAlertMessages("");
  }

    /*if(validatename || validatesurname){
      alert(validatename)
      return;
    }
    if(validateDoc){
      alert(validateDoc)
      return;
    }
    if(validatePhone){
      alert(validatePhone)
      return;
    }*/

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
    setAlertMessages([]);
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Nuevo Estudiante</h2>
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className={`col-md-6 form-group ${Error.name !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="name">Nombre:</label>
          <input className='form-control' type="text" name="name" value={studentData.name} onChange={handleInputChange} required/>
        </div>
        <div className={`col-md-6 form-group ${Error.name !== '' ? 'error-input' : ''}`}>
          <label className='form-label' htmlFor="surname">Apellido:</label>
          <input className='form-control' type="text" name="surname" value={studentData.surname} onChange={handleInputChange} required/>
        </div>
        <div className='col-md-2'>
          <label className='form-label' htmlFor="age">Edad:</label>
          <input className='form-control' type="number" name="age" value={studentData.age} onChange={handleInputChange} required/>
        </div>
        <div className='col-md-4'>
          <label className='form-label' htmlFor="phone">Telefono (fijo o movil):</label>
          <input className='form-control' type="text" name="phone" value={studentData.phone} onChange={handleInputChange} required/>
        </div>
        <div className='col-md-6'>
          <label className='form-label' htmlFor="document">Documento:</label>
          <input className='form-control' type="number" name="document" value={studentData.document} onChange={handleInputChange} required/>
        </div>
        <div className='col-12'>
          <label className='form-label' htmlFor="direction">Dirección:</label>
          <input className='form-control' type="text" name="direction" value={studentData.direction} onChange={handleInputChange} required/>
        </div>
        <button className='btn btn-primary' type="submit" > Crear</button>
      </form>
    </div>
  );
}

export default StudentCreateForm;