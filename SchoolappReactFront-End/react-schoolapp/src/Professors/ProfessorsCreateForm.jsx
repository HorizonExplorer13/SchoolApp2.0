import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Utilitys/Forms.css';


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
        if(error.response && error.response.status == 409){
          setErrorD('Actualmente ya hay un profesor con esta infmormacion y asignado a esta materia');
          console.log('Actualmente ya hay un profesor con esta infmormacion y asignado a esta materia');
        }else{
          setErrorD('hubo un error creando al estudiante');
        }      
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

    try {
      const response = await axios.post('https://localhost:44339/api/professors/Create', formData);
      if(response.status == 200){
        Nav(`/professorslist`);

      }
      // Aquí puedes manejar la respuesta del servidor según tu necesidad
    } catch (error) {
      console.error('Error creating professor:', error);
      // Aquí puedes manejar el error según tu necesidad
    }
  };

  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Crear profesor</h2>
      {errorD && <p style={{ color: 'red' }}>{errorD}</p>}
      <form className='row g-3' onSubmit={handleSubmit}>
        <label className='form-label'>
          Select Subject:
          <select class="form-select" name="subjectId" value={formData.subjectId} onChange={handleInputChange}>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
        <label className='form-label'>
          Documento:
          <input type="text" name="document" value={formData.document} onChange={handleInputChange} />
        </label>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
        </label>
        <label>
          Edad:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </label>
        <label>
          Dirección:
          <input type="text" name="direction" value={formData.direction} onChange={handleInputChange} />
        </label>
        <label>
          telefono (fijo o movil):
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
        </label>
        <button type="submit">Create Professor</button>
      </form>
    </div>
  );
};

export default CreateProfessorForm;