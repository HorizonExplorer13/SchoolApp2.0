import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfessorForm = ({refreshProfessorList}) => {
    const Nav = useNavigate();
    const { professorId } = useParams();
  const [professor, setProfessor] = useState(null);
  const [subjects, setSubjects] = useState([]);

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://localhost:44339/api/professors/Update/${professorId}`, professor);
      if(response.status == 200){
        Nav(`/professorslist`);
        refreshProfessorList();
      }
    
    } catch (error) {
      console.error('Error updating professor:', error);
      // Aquí puedes manejar el error según tu necesidad
    }
  };

  if (!professor || !subjects.length) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h2>Update Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Subject:
          <select name="subjectId" value={professor.subjects.subjectId} onChange={handleInputChange}>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Document:
          <input type="text" name="document" value={professor.document} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={professor.name} onChange={handleInputChange} />
        </label>
        <label>
          Surname:
          <input type="text" name="surname" value={professor.surname} onChange={handleInputChange} />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={professor.age} onChange={handleInputChange} />
        </label>
        <label>
          Direction:
          <input type="text" name="direction" value={professor.direction} onChange={handleInputChange} />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={professor.phone} onChange={handleInputChange} />
        </label>
        <button type="submit">Update Professor</button>
      </form>
    </div>
  );
  }
export default UpdateProfessorForm;