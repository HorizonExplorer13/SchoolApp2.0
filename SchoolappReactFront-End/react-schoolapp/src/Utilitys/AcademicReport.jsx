import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function AcademicReport(){
    const [reports,setReport] = useState([]);
    useEffect(()=>{
         axios.get('https://localhost:44339/api/AcademicReport/GetReport')
        .then(response => setReport(response.data))
        .catch(error => console.error('Error fetching subjects:', error));
    },[])
    return(
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <h2>Academic Report</h2>
            <div className="table-responsive">
            <table className="table table-striped">
                <thead className="thead-info">
                    <th>Año</th>
                    <th>Estudiante</th>
                    <th>Documento</th>
                    <th>Materia</th>
                    <th>Codigo</th>
                    <th>Profesor</th>
                    <th>Documento</th>
                    <th>Nota</th>
                    <th>Aprovado</th>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.Id}>
                            <td>{report.year == "null"? " " : report.year}</td>
                            <td>{report.studentName == "null"? " " : report.studentName}</td>
                            <td>{report.studentDocument == "null"? " " : report.studentDocument}</td>
                            <td>{report.subjectName == "null"? " " : report.subjectName}</td>
                            <td>{report.subjectCode == "null"? " " : report.subjectCode}</td>
                            <td>{report.professorName == "null"? " " : report.professorName}</td>
                            <td>{report.professorDocument == "null"? " " : report.professorDocument}</td>
                            <td>{report.grade == "null"? " " : report.grade}</td>
                            <td>{report.grade == "null"? " " : report.grade >= 3.0 ? "Si" : "No" }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>           
        </div>
    )

}

export default AcademicReport;