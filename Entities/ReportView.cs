﻿namespace SchoolApp.Entities
{
    public class ReportView
    {
        public int? Year { get; set; }
        public string? StudentDocument { get; set; }
        public string? StudentName { get; set; }
        public string? SubjectCode { get; set; }
        public string? SubjectName { get; set; }
        public string? ProfessorDocument { get; set; } 
        public string? ProfessorName { get; set; }
        public float? Grade { get; set; }
    }
}
