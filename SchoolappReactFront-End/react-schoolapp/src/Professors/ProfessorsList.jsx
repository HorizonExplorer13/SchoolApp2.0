import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Professorlist(){
    const [professor, setprofesor] = useState([]);

  useEffect(() => {
    // Hacer una solicitud GET para obtener las asignaturas
    axios.get('https://localhost:44339/api/professors/Getlist')
      .then(response => setprofesor(response.data))
      .catch(error => console.error('Error fetching professors:', error));
  }, []);
    const Nav = useNavigate();
    const Navegatetoform = () =>{
        Nav('/professorcreate')

      }

      const handleDelete = (professorId) => {
        try {
            axios.delete(`https://localhost:44339/api/professors/Delete/${professorId}`)
            refreshProfessorList();
            Navi(`/professorslist`);
            
            

        } catch (error) {
            console.error('Error deleting professors:', error);
        }
      };

      const refreshProfessorList = () => {
        axios.get('https://localhost:44339/api/professors/Getlist')
            .then(response => setprofesor(response.data))
            .catch(error => console.error('Error fetching professors:', error));
      };
    return(
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>   
            <h2>Profesores</h2> 
            <button className="btn btn-primary" onClick={Navegatetoform}>Crear profesor</button>
            {professor.length > 0 ? (
            <table className="table">
            <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Documento</th>
                        <th>Edad</th>
                        <th>Materia</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {professor.map(professor => (
                        <tr key={professor.professorId}>
                            <td>{professor.name}</td>
                            <td>{professor.surname}</td>
                            <td>{professor.document}</td>
                            <td>{professor.age}</td>
                            <td>{professor.subjects ? professor.subjects.name : " "}</td>
                            <td><Link to={`/professorupdate/${professor.professorId}`} className="btn btn-warning">Actualizar</Link></td>
                            <td><button onClick={() => handleDelete(professor.professorId)} className="btn btn-danger">Eliminar</button></td>
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

export default Professorlist;