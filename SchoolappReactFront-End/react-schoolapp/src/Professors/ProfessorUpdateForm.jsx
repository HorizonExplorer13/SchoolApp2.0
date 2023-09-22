import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ValidatateDoc, ValidatePhoneN, ValidationNames, ValidationSurnames } from '../Utilitys/Validations';

const UpdateProfessorForm = ({refreshProfessorList}) => {
    const Nav = useNavigate();
    const [errorD,setErrorD] = useState();
    const { professorId } = useParams();
  const [professor, setProfessor] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [Error,setError] = useState({
    name: "",
    surname:"",
    doc:"",
    phone:"",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [professorResponse, subjectsResponse] = await Promise.all([
          axios.get(`https://localhost:44339/api/professors/GetById/${professorId}`),
          axios.get('https://localhost:44339/api/Subjects/Getlist'),
        ]);
        setProfessor(professorResponse.data);
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [professorId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfessor({
      ...professor,
      [name]: value,
    });
    setError({ ...Error, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validatename = ValidationNames(professor.name);
    const validatesurname = ValidationSurnames(professor.surname);
    const validateDoc = ValidatateDoc(professor.document);
    const validatePhone = ValidatePhoneN(professor.phone);

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
        const response = await axios.put(`https://localhost:44339/api/professors/Update/${professorId}`, professor);
        if(response.status == 200){
          Nav(`/professorslist`);
          refreshProfessorList();
        }
      
      } catch (error) {
        console.error('Error updating professor:', error);
        if (error.response && error.response.status == 409) {
          setErrorD('Actualmente ya hay un estudiante con esta informacion');
          console.log('Actualmente ya hay un profesor con esta infmormacion');
        }else{
          setErrorD('hubo un error actualizando al profesor');
        }    
      }
    }
  };

  if (!professor || !subjects.length) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
    <h2>Crear profesor</h2>
    {errorD && <p style={{ color: 'red' }}>{errorD}</p>}
    <form className='row g-3' onSubmit={handleSubmit}>
      <div className={`col-md-5 form-group ${Error.name !== '' ? 'error-input' : ''}`}>    
      <label className='form-label'>Nombre:</label>
      <input className={`form-control ${Error.name !== '' ? 'error-input-field' : ''}`} type="text" name="name" value={professor.name} onChange={handleInputChange} required/>
      {Error.name && <div className='error-message'>{Error.name}</div>}
      </div>
      <div className={`col-md-5 form-group ${Error.surname !== '' ? 'error-input' : ''}`}>
      <label className='form-label'>Apellido:</label>
      <input className={`form-control ${Error.surname !== '' ? 'error-input-field' : ''}`} type="text" name="surname" value={professor.surname} onChange={handleInputChange} required/>
      {Error.surname && <div className='error-message'>{Error.surname}</div>}
      </div>
      <div className='col-md-2'>
      <label className='form-label'>Edad:</label>
      <input className='form-control' type="number" name="age" value={professor.age} onChange={handleInputChange} />
      </div>
      <div className={`col-md-5 form-group' ${Error.doc !== '' ? 'error-input' : ''}`}>
      <label className='form-label'>Documento:</label>
      <input className={`form-control ${Error.doc !== '' ? 'error-input-field' : ''}`} type="text" name="document" value={professor.document} onChange={handleInputChange} />
      {Error.doc && <div className='error-message'>{Error.doc}</div>}
      </div>
      <div className='col-md-7'>
      <label className='form-label'>Dirección:</label>
      <input className='form-control' type="text" name="direction" value={professor.direction} onChange={handleInputChange} />
      </div>
      <div className={`col-md-5 form-group' ${Error.phone !== '' ? 'error-input' : ''}`}>
      <label className='form-label'> telefono (fijo o movil):</label>
      <input className={`form-control ${Error.phone !== '' ? 'error-input-field' : ''}`} type="text" name="phone" value={professor.phone} onChange={handleInputChange} />
      {Error.phone && <div className='error-message'>{Error.phone}</div>}
      </div>
      <div className='col-md-2'>
      <label className='form-label'>
        Selecionar Materia:</label>
        <select class="form-select" name="subjectId" value={professor.subjectId} onChange={handleInputChange}>
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
  }
export default UpdateProfessorForm;