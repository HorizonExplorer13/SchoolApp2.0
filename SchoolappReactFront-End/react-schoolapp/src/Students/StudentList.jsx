import React,{useState,useEffect} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

function Studentlist(){
    const Navi = useNavigate();
    const [Error,setError] = useState("");
    const [students, setStudent] = useState([]);

  useEffect(() => {
    // Hacer una solicitud GET para obtener las asignaturas
    axios.get('https://localhost:44339/api/Students/Getlist')
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching Students:', error));
  }, []);
    const Nav = useNavigate();
    const Navegatetoform = () =>{
        Nav('/studentcreate')

      }
      const handleDelete = async (studentId) => {
        try {
            const response = await axios.delete(`https://localhost:44339/api/Students/Delete/${studentId}`)
            if(response.status === 400){
                setError("El estudiante seleccionado tiene actualmente una o mas materias asignadas no se puede eliminar");
            }else{
                Navi(`/`);
                refreshStudentList();
            }

          

        } catch (error) {
            console.error('Error deleting Student:', error);
        }
      };

      const refreshStudentList = () => {
        axios.get('https://localhost:44339/api/Students/Getlist')
            .then(response => setStudent(response.data))
            .catch(error => console.error('Error fetching subjects:', error));
      };
    return(
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
            {Error && <div className="error-message">{Error}</div>}   
            <h2>Estudiantes</h2> 
            <button className="btn btn-primary" onClick={Navegatetoform}>New Student</button>
            {students.length > 0 ? (
            <table className="table">
            <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Documento</th>
                        <th>Edad</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.document}</td>
                            <td>{student.age}</td>
                            <td><Link to={`/subjectassigner/${student.studentId}`} className="btn btn-secondary">Asignar Materia</Link></td>
                            <td><Link to={`/studentupdate/${student.studentId}`} className="btn btn-warning">Actualizar</Link></td>
                            <td><button onClick={() => handleDelete(student.studentId)} className="btn btn-danger">Eliminar</button></td>
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

export default Studentlist;