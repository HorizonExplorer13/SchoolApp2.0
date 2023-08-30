using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolApp.Migrations
{
    /// <inheritdoc />
    public partial class SecondM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_students_subjects_SubjectsSubjectId",
                table: "students");

            migrationBuilder.DropIndex(
                name: "IX_students_SubjectsSubjectId",
                table: "students");

            migrationBuilder.DropColumn(
                name: "SubjectId",
                table: "students");

            migrationBuilder.DropColumn(
                name: "SubjectsSubjectId",
                table: "students");

            migrationBuilder.CreateTable(
                name: "studentSubjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    SubjectId = table.Column<int>(type: "int", nullable: false),
                    Grade = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentSubjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_studentSubjects_students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_studentSubjects_subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "subjects",
                        principalColumn: "SubjectId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_studentSubjects_StudentId",
                table: "studentSubjects",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_studentSubjects_SubjectId",
                table: "studentSubjects",
                column: "SubjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "studentSubjects");

            migrationBuilder.AddColumn<int>(
                name: "SubjectId",
                table: "students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubjectsSubjectId",
                table: "students",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_students_SubjectsSubjectId",
                table: "students",
                column: "SubjectsSubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_students_subjects_SubjectsSubjectId",
                table: "students",
                column: "SubjectsSubjectId",
                principalTable: "subjects",
                principalColumn: "SubjectId");
        }
    }
}
