import React, { useState } from 'react';
import SubjectData from '../Model/SubjectData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SubjectForm({ onSubmit }) {
  const nav = useNavigate();
  const [subjectData, setSubjectData] = useState(new SubjectData('', ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subjectData.code && subjectData.name) {
        try {
            const response = await axios.post('https://localhost:44339/api/Subjects/Create', subjectData);
            if(response.status == 200){
                //onSubmit(subjectData);
                nav(`/subjectlist`);
                setSubjectData(new SubjectData('', ''));
            }
            
        } catch (error) {
            console.error('Something was wrong sending the data',error);
            if(error.response && error.response.status == 409){
              setErrorD('Actualmente ya hay una materia con este codigo');
              console.log('Actualmente ya hay una materia con este codigo');
            }else{
              setErrorD('hubo un error creando al la materia');
            }      
        }
  
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
  <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
    <h2>Nueva Materia</h2>
    <form className='row g-3' onSubmit={handleSubmit}>
      <div className='col-md-6'>
        <label className='fomr-label' htmlFor="code">Codigo:</label>
        <input className='form-control' type="text" id="code" name="code" value={subjectData.code} onChange={handleInputChange}/>
      </div>
      <div className='col-md-6'>
        <label className='fomr-label' htmlFor="name">Nombre:</label>
        <input className='form-control' type="text" id="name" name="name" value={subjectData.name} onChange={handleInputChange}/>
      </div>
      <button className='btn btn-primary' type="submit">Crear</button>
    </form>
  </div>
    
  );
}

export default SubjectForm;
