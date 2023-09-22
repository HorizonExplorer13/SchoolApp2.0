import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SubjectUpdateForm({ refreshSubjectList }) {
  const Nav = useNavigate();
  const {subjectId} = useParams();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener los detalles del subject(la Materia o asignatura) por su ID
    axios.get(`https://localhost:44339/api/Subjects/GetById/${subjectId}`)
      .then(response => {
        setCode(response.data.code);
        setName(response.data.name);
      })
      .catch(error => {
        setError('Error fetching subject details',error);
      });
  }, [subjectId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(code && name){
        const updatedData = {};
        if (code) updatedData.code = code;
        if (name) updatedData.name = name;    
        // Enviar la solicitud de actualización
        try {
             await axios.put(`https://localhost:44339/api/Subjects/Update/${subjectId}`, updatedData);
             Nav(`/subjectlist`);    
             refreshSubjectList();            
        } catch (error) {
            console.error('Error assigning student subject:', error);
            setError("Hubo un error interno actualizando la materia");
        }
      };
    }
  return (
    <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Update Subject</h2>
      <form className='row g-3' onSubmit={handleUpdate}>
        <div className='col-md-6'>
          <label className='fomr-label' htmlFor="code">Code:</label>
          <input className='form-control' type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label className='fomr-label' htmlFor="name">Name:</label>
          <input className='form-control' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit" className='btn btn-primary'>Actualizar</button>
      </form>
      
    </div>
  );
}

export default SubjectUpdateForm;