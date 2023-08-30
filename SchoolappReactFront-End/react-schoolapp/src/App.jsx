import React, { useState } from "react";
import Navbar from "./Utilitys/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Utilitys/About";
import SubjectForm from "./Subjects/SubjectForm";
import Subjectlist from "./Subjects/SubjectList";
import SubjectData from "./Model/SubjectData";
import Studentlist from "./Students/StudentList";
import StudentSubjectForm from "./Utilitys/SubjectAssigner";
import StudentSubjectAssigner from "./Utilitys/SubjectAssigner";
import AcademicReport from "./Utilitys/AcademicReport";
import UpdateSubjectForm from "./Subjects/SubjectUpdateForm";
import SubjectUpdateForm from "./Subjects/SubjectUpdateForm";
import StudentCreateForm from "./Students/StudentCreateForm";
import StudentUpdateForm from "./Students/StudentUpdateForm";
import Professorlist from "./Professors/ProfessorsList";
import ProfessorCreateForm from "./Professors/ProfessorsCreateForm";
import CreateProfessorForm from "./Professors/ProfessorsCreateForm";
import UpdateProfessorForm from "./Professors/ProfessorUpdateForm";

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
  return (
    <BrowserRouter>
        <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AcademicReport />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/studentlist" element={<Studentlist refreshStudentList={refreshStudentList}/>}/>
        <Route path="/studentcreate" element={<StudentCreateForm/>}/>
        <Route path="/studentupdate/:studentId" element={<StudentUpdateForm />}/>
        <Route path="/subjectlist" element={<Subjectlist refreshSubjectList={refreshSubjectList} />}/>
        <Route path="/subjectform" element={<SubjectForm />}/>
        <Route path="/subjectupdater/:subjectId" element={<SubjectUpdateForm />}/>
        <Route path="/subjectassigner/:studentId" element={<StudentSubjectAssigner />}/>
        <Route path="/professorslist" element={<Professorlist refreshProfessorList={refreshProfessorList}/>}/>
        <Route path="/professorcreate" element={<CreateProfessorForm/>}/>
        <Route path="/professorupdate/:professorId" element={<UpdateProfessorForm />}/>
      </Routes>
    </div>
    </BrowserRouter> 

  );
}

export default App;
