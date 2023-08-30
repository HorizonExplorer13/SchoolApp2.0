import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateProfessorForm = () => {
    const Nav = useNavigate();
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
    <div>
      <h1>Professor Management</h1>
      <h2>Create Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Subject:
          <select name="subjectId" value={formData.subjectId} onChange={handleInputChange}>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Document:
          <input type="text" name="document" value={formData.document} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Surname:
          <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
        </label>
        <label>
          Direction:
          <input type="text" name="direction" value={formData.direction} onChange={handleInputChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
        </label>
        <button type="submit">Create Professor</button>
      </form>
    </div>
  );
};

export default CreateProfessorForm;