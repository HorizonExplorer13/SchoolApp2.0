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
    // Obtener los detalles del subject por su ID
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
            setError("there was an error");
        }
      };
    }

 

  return (
    <div>
      <h2>Update Subject</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit" className='btn btn-primary'>Update Subject</button>
      </form>
    </div>
  );
}

export default SubjectUpdateForm;