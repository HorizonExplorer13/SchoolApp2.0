import React, { useState } from "react";
import Navbar from "./Utilitys/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubjectForm from "./Subjects/SubjectForm";
import Subjectlist from "./Subjects/SubjectList";
import Studentlist from "./Students/StudentList";
import StudentSubjectAssigner from "./Utilitys/StudentSubjects/SubjectAssigner";
import AcademicReport from "./Utilitys/AcademicReport";
import SubjectUpdateForm from "./Subjects/SubjectUpdateForm";
import StudentCreateForm from "./Students/StudentCreateForm";
import StudentUpdateForm from "./Students/StudentUpdateForm";
import Professorlist from "./Professors/ProfessorsList";
import CreateProfessorForm from "./Professors/ProfessorsCreateForm";
import UpdateProfessorForm from "./Professors/ProfessorUpdateForm";
import StudentSubjectList from "./Utilitys/StudentSubjects/StudentSubjectsList";

// Here we declared the methods to reload the pages
function App() {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const refreshSubjectList = () => {
    setShouldRefresh(!shouldRefresh);
  };
  const refreshStudentList = () =>{
    setShouldRefresh(!shouldRefresh)
  }; 
  const refreshProfessorList = () =>{
    setShouldRefresh(!shouldRefresh)
  }
  const refreshList = () =>{
    setShouldRefresh(!shouldRefresh)
  }

  return (
    // we set the routes or Url that will represent each pages in the app.
    <BrowserRouter>
        <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AcademicReport />}/>
        <Route path="/studentlist" element={<Studentlist refreshStudentList={refreshStudentList}/>}/>
        <Route path="/studentcreate" element={<StudentCreateForm/>}/>
        <Route path="/studentupdate/:studentId" element={<StudentUpdateForm />}/>
        <Route path="/subjectlist" element={<Subjectlist refreshSubjectList={refreshSubjectList} />}/>
        <Route path="/subjectform" element={<SubjectForm />}/>
        <Route path="/subjectupdater/:subjectId" element={<SubjectUpdateForm />}/>
        <Route path="/subjectassigner/:studentId" element={<StudentSubjectAssigner />}/>
        <Route path="/studentsubjectlist" element={<StudentSubjectList refreshProfessorList={refreshProfessorList}/>}/>
        <Route path="/professorslist" element={<Professorlist refreshProfessorList={refreshList}/>}/>
        <Route path="/professorcreate" element={<CreateProfessorForm/>}/>
        <Route path="/professorupdate/:professorId" element={<UpdateProfessorForm />}/>
      </Routes>
    </div>
    </BrowserRouter> 

  );
}

export default App;
