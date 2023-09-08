import React,{useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';


function Subjectlist(){
    const [subjects, setSubjects] = useState([]);



  useEffect(() => {
    // Hacer una solicitud GET para obtener las asignaturas
    axios.get('https://localhost:44339/api/Subjects/Getlist')
      .then(response => setSubjects(response.data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);
    const Navi = useNavigate();
    const Nav = useNavigate();
    const Navegatetoform = () =>{
        Nav('/subjectform')
    }
    

    const handleDelete = (subjectId) => {
        try {
            axios.delete(`https://localhost:44339/api/Subjects/Delete/${subjectId}`)
            refreshSubjectList();
            Navi(`/subjectlist`);
            
            

        } catch (error) {
            console.error('Error deleting subject:', error);
        }
      };

      const refreshSubjectList = () => {
        axios.get('https://localhost:44339/api/Subjects/Getlist')
            .then(response => setSubjects(response.data))
            .catch(error => console.error('Error fetching subjects:', error));
    };

    return(
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <button className="btn btn-primary" onClick={Navegatetoform}>New Subject</button>
            <h2>Materias</h2> 
            {subjects.length > 0 ? (
            <table className="table">
            <thead class="table-dark">
                    <tr>
                        <th>Codigo</th>
                        <th>Materia</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subject => (
                        <tr key={subject.subjectId}>
                            <td>{subject.code}</td>
                            <td>{subject.name}</td>
                            <td><Link to={`/subjectupdater/${subject.subjectId}`} className="btn btn-warning">Update</Link></td>
                            <td><button onClick={() => handleDelete(subject.subjectId)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p>No hay estudiantes disponibles.</p>
              )}       
        </div>
    )
}

export default Subjectlist;