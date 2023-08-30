import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AssignerData from '../Model/AssignerData'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentSubjectAssigner() {
  const Nav = useNavigate();
  const {studentId} = useParams();
  const [student, setStudents] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [year,setYear] = useState('');
  const [grade, setGrade] = useState('');
  const [errorM, setError] = useState('');
  console.log('studentId:', studentId);

  useEffect(()=>{
    axios.get(`https://localhost:44339/api/Students/GetById/${studentId}`)
    .then(response => setStudents(response.data))
    .catch(error => console.error('Error fetching students:', error));

    axios.get('https://localhost:44339/api/Subjects/Getlist')
    .then(response => setSubjects(response.data))
    .catch(error => console.error('Error fetching subjects:', error));
  },[studentId]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (year && studentId && selectedSubject && grade) {
      const assignerData = new AssignerData(
        parseInt(year), 
        parseInt(studentId),
        parseInt(selectedSubject),
        parseFloat(grade)
      );
      try {
        const response = await axios.post('https://localhost:44339/api/subjectAssigner/Assign', assignerData);
        if (response.status == 200) {
          console.log('Student subject assigned successfully');
          Nav(`/studentlist`);
          // Realizar otras acciones después de guardar si es necesario
        }
      } catch (error) {
        console.error('Error assigning student subject:', error);

        if (error.response && error.response.status == 400) {
          setError('This student has already been assigned a subject this year');
      } else {
        setError('Something went wrong while sending the data.');
    }
  }
}
};

const handleInputChange = () =>{
  setError('');
}

return(
    <div>
        <h2>Assign Student Subject</h2>
        {student ? <p>Assigning subject to {student.name}</p> : <p>Loading student ...</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='year'>Year:</label>
                <input type='number' id='year' value={year} onChange={(e) => { setYear(e.target.value); handleInputChange(); }}/>
            </div>
        <div>
          <label htmlFor="subject">Select Subject:</label>
          <select id="subject" value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); handleInputChange(); }}>
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject.subjectId} value={subject.subjectId}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>
          <input type="number" id="grade" value={grade} onChange={(e) => { setGrade(e.target.value); handleInputChange(); }}/>
        </div>
        <button type="submit">Assign Subject</button>
        </form>
        {errorM && <p style={{ color: 'red' }}>{errorM}</p>}
    </div>
);
            }
            
            export default StudentSubjectAssigner;
