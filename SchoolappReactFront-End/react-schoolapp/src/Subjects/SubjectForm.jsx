import React, { useState } from 'react';
import SubjectData from '../Model/SubjectData'; // Importa el DTO
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
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="code">Code:</label>
        <input type="text" id="code" name="code" value={subjectData.code} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={subjectData.name} onChange={handleInputChange}/>
      </div>
      <button type="submit">Send</button>
    </form>

  </div>
    
  );
}

export default SubjectForm;
