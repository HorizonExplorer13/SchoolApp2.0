import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function StudentSubjectList(){

    const [Assigns, setAssigs] = useState([]);

    useEffect(() => {
        //
        axios.get('https://localhost:44339/api/subjectAssigner/Assignlist')
          .then(response => setAssigs(response.data))
          .catch(error => console.error('Error fetching Students:', error));
      }, []);

      const handleDelete = async (assingId) => {
        try {
            const response = await axios.delete(`https://localhost:44339/api/subjectAssigner/Delete/${assingId}`)
            if(response.status == 200){
                refreshList();
                Navi(`/studentsubjectlist`);           
            }    
        } catch (error) {
            console.error('Error deleting Student:', error);
        }

      };
      const refreshList = async () => {
        await axios.get('https://localhost:44339/api/subjectAssigner/Assignlist')
            .then(response => setAssigs(response.data))
            .catch(error => console.error('Error fetching subjects:', error));
      };

      return(
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
        <h2>Materias asignadas</h2> 
        {Assigns.length > 0 ? (
        <table className="table">
        <thead className="table-dark">
                <tr>
                    <th>Año</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Codigo</th>
                    <th>Materia</th>                 
                    <th></th>          
                </tr>
            </thead>
            <tbody>
                {Assigns.map(Assign => (
                    <tr key={Assign.id}>
                        <td>{Assign.year == "null"? " " : Assign.year}</td>
                        <td>{Assign.students ? Assign.students.name : " "}</td>
                        <td>{Assign.students ? Assign.students.document : " "}</td>
                        <td>{Assign.students ? Assign.subjects.code : " "}</td>
                        <td>{Assign.students ? Assign.subjects.name : " "}</td>
                        <td><button onClick={() => handleDelete(Assign.id)} className="btn btn-danger">Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <p>No hay asignaciones disponibles.</p>
      )}   
    </div>
      )
}
export default StudentSubjectList;