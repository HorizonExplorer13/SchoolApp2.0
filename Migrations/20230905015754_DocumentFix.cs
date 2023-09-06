using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolApp.Migrations
{
    /// <inheritdoc />
    public partial class DocumentFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "Grade",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "ProfessorName",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "StudentName",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "SubjectName",
                table: "reports");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "reports",
                newName: "SubjectId");

            migrationBuilder.RenameColumn(
                name: "StudentDocument",
                table: "reports",
                newName: "StudentSubjectId");

            migrationBuilder.RenameColumn(
                name: "ProfessorDocument",
                table: "reports",
                newName: "StudentId");

            migrationBuilder.AlterColumn<string>(
                name: "Document",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ProfessorId",
                table: "reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProfessorsProfessorId",
                table: "reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StudentsStudentId",
                table: "reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SubjectsSubjectId",
                table: "reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "studentSubjectsId",
                table: "reports",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Document",
                table: "professors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_reports_ProfessorsProfessorId",
                table: "reports",
                column: "ProfessorsProfessorId");

            migrationBuilder.CreateIndex(
                name: "IX_reports_StudentsStudentId",
                table: "reports",
                column: "StudentsStudentId");

            migrationBuilder.CreateIndex(
                name: "IX_reports_studentSubjectsId",
                table: "reports",
                column: "studentSubjectsId");

            migrationBuilder.CreateIndex(
                name: "IX_reports_SubjectsSubjectId",
                table: "reports",
                column: "SubjectsSubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_professors_ProfessorsProfessorId",
                table: "reports",
                column: "ProfessorsProfessorId",
                principalTable: "professors",
                principalColumn: "ProfessorId");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_studentSubjects_studentSubjectsId",
                table: "reports",
                column: "studentSubjectsId",
                principalTable: "studentSubjects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_students_StudentsStudentId",
                table: "reports",
                column: "StudentsStudentId",
                principalTable: "students",
                principalColumn: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_reports_subjects_SubjectsSubjectId",
                table: "reports",
                column: "SubjectsSubjectId",
                principalTable: "subjects",
                principalColumn: "SubjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reports_professors_ProfessorsProfessorId",
                table: "reports");

            migrationBuilder.DropForeignKey(
                name: "FK_reports_studentSubjects_studentSubjectsId",
                table: "reports");

            migrationBuilder.DropForeignKey(
                name: "FK_reports_students_StudentsStudentId",
                table: "reports");

            migrationBuilder.DropForeignKey(
                name: "FK_reports_subjects_SubjectsSubjectId",
                table: "reports");

            migrationBuilder.DropIndex(
                name: "IX_reports_ProfessorsProfessorId",
                table: "reports");

            migrationBuilder.DropIndex(
                name: "IX_reports_StudentsStudentId",
                table: "reports");

            migrationBuilder.DropIndex(
                name: "IX_reports_studentSubjectsId",
                table: "reports");

            migrationBuilder.DropIndex(
                name: "IX_reports_SubjectsSubjectId",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "ProfessorId",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "ProfessorsProfessorId",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "StudentsStudentId",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "SubjectsSubjectId",
                table: "reports");

            migrationBuilder.DropColumn(
                name: "studentSubjectsId",
                table: "reports");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "reports",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "StudentSubjectId",
                table: "reports",
                newName: "StudentDocument");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "reports",
                newName: "ProfessorDocument");

            migrationBuilder.AlterColumn<int>(
                name: "Document",
                table: "students",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Grade",
                table: "reports",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "ProfessorName",
                table: "reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentName",
                table: "reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubjectName",
                table: "reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Document",
                table: "professors",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
