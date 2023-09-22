import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Utilitys/Forms.css';
import { ValidatateDoc, ValidatePhoneN, ValidationNames, ValidationSurnames } from '../Utilitys/Validations';


const CreateProfessorForm = () => {
    const Nav = useNavigate();
    const [errorD,setErrorD] = useState();
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subjectId: '',
    document: '',
    name: '',
    surname: '',
    age: '',
    direction: '',
    phone: '',
  });
  const [Error,setError] = useState({
    name: "",
    surname:"",
    doc:"",
    phone:"",
  });


  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get('https://localhost:44339/api/Subjects/Getlist'); 
        setSubjects(response.data);
        if (response.data.length > 0) {
          setFormData({
            ...formData,
            subjectId: response.data[0].id,
          });
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);     
      }
    }

    fetchSubjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,    
    });
    setError({ ...Error, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validatename = ValidationNames(formData.name);
    const validatesurname = ValidationSurnames(formData.surname);
    const validateDoc = ValidatateDoc(formData.document);
    const validatePhone = ValidatePhoneN(formData.phone);

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
        console.log(formData.subjectId)
        const response = await axios.post('https://localhost:44339/api/professors/Create', formData);
        if(response.status == 200){
          Nav(`/professorslist`); 
        }
      } catch (error) {
        console.error('Error creating professor:', error);
        if(error.response && error.response.status == 409){
          setErrorD('Actualmente ya hay un profesor con esta información y asignado a esta materia');
          console.log('Actualmente ya hay un profesor con esta información y asignado a esta materia');
        }else{
          setErrorD('hubo un error creando al profesor');
        }      
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Crear profesor</h2>
      {errorD && <p style={{ color: 'red' }}>{errorD}</p>}
      <form className='row g-3' onSubmit={handleSubmit}>
        <div className={`col-md-5 form-group ${Error.name !== '' ? 'error-input' : ''}`}>    
        <label className='form-label'>Nombre:</label>
        <input className={`form-control ${Error.name !== '' ? 'error-input-field' : ''}`} type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
        {Error.name && <div className='error-message'>{Error.name}</div>}
        </div>
        <div className={`col-md-5 form-group ${Error.surname !== '' ? 'error-input' : ''}`}>
        <label className='form-label'>Apellido:</label>
        <input className={`form-control ${Error.surname !== '' ? 'error-input-field' : ''}`} type="text" name="surname" value={formData.surname} onChange={handleInputChange} required/>
        {Error.surname && <div className='error-message'>{Error.surname}</div>}
        </div>
        <div className='col-md-2'>
        <label className='form-label'>Edad:</label>
        <input className='form-control' type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </div>
        <div className={`col-md-5 form-group' ${Error.doc !== '' ? 'error-input' : ''}`}>
        <label className='form-label'>Documento:</label>
        <input className={`form-control ${Error.doc !== '' ? 'error-input-field' : ''}`} type="text" name="document" value={formData.document} onChange={handleInputChange} />
        {Error.doc && <div className='error-message'>{Error.doc}</div>}
        </div>
        <div className='col-md-7'>
        <label className='form-label'>Dirección:</label>
        <input className='form-control' type="text" name="direction" value={formData.direction} onChange={handleInputChange} />
        </div>
        <div className={`col-md-5 form-group' ${Error.phone !== '' ? 'error-input' : ''}`}>
        <label className='form-label'> telefono (fijo o movil):</label>
        <input className={`form-control ${Error.phone !== '' ? 'error-input-field' : ''}`} type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
        {Error.phone && <div className='error-message'>{Error.phone}</div>}
        </div>
        <div className='col-md-2'>
        <label className='form-label'>
          Selecionar Materia:</label>
          <select class="form-select" name="subjectId" value={formData.subjectId} onChange={handleInputChange}>
          <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary' type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateProfessorForm;