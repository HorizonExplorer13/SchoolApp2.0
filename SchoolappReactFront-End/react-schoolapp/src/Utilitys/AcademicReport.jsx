// Here we import the funtions or liblaries from react,axios and bootstrap.
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Here we create a function to show a report about the students, their subject and grades.
function AcademicReport(){
    // we get or bring from the database this imformation to show.
    const [reports,setReport] = useState([]);//we declare and init as an array(or colection of data) the const or variable reports.
    const [Pagenumber,setPage] = useState(1);
    const Nav = useNavigate();
    /* Here we use useEffect to execute a kind of function when the page will be load in the browser, 
       inside this useEffect we redirect or execute a function in our backend(or API) to get the information and assigned or save inside reports*/
    useEffect(()=>{
        axios.get(`https://localhost:44339/api/AcademicReport/GetReport/${Pagenumber}`)// this line connect with the Api to made it send back the data.
        .then(response =>setReport(response.data))// this line saves the information. 
        .catch(error => console.error('Error fetching subjects:', error)); // this line tell us by console if something went wrong.
    },[Pagenumber])

    const PreviousPage = () =>{
        if(Pagenumber > 1){
            setPage(Pagenumber-1)
            refreshReport()
            Nav('/')
        }
    }

    const NextPage = ()=>{     
            setPage(Pagenumber+1)
            refreshReport()
            Nav('/')
    }

    const refreshReport = async () =>{
        await axios.get(`https://localhost:44339/api/AcademicReport/GetReport/${Pagenumber}`)
        .then(response => setReport(response.data))
    }

    return(// Here we create a table to show the data as a report.
        <div className="container" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <h2>Reporte Academico </h2>
            <div className="table-responsive">
            {reports.length > 0 ? (
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
            ) : (
                <p>No hay Registros disponibles.</p>
              )}  
            </div>
            <div>
            {reports.length > 0 ?(
                <div>
                    {Pagenumber > 1 ?(
                        <button onClick={PreviousPage}>Previous</button>
                    ):(
                        <p></p>
                    )}            
           <button onClick={NextPage}>Next</button>   
           </div>    
            ) : (
                <p></p>
            )}
            </div>          
        </div>
    )
}
// Here we export this page, funtion, component to be called along the all aplication.
export default AcademicReport;