USE [master]
GO
/****** Object:  Database [SchoolApp]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE DATABASE [SchoolApp]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SchoolApp', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SchoolApp.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SchoolApp_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\SchoolApp_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SchoolApp] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SchoolApp].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SchoolApp] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SchoolApp] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SchoolApp] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SchoolApp] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SchoolApp] SET ARITHABORT OFF 
GO
ALTER DATABASE [SchoolApp] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SchoolApp] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SchoolApp] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SchoolApp] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SchoolApp] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SchoolApp] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SchoolApp] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SchoolApp] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SchoolApp] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SchoolApp] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SchoolApp] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SchoolApp] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SchoolApp] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SchoolApp] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SchoolApp] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SchoolApp] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [SchoolApp] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SchoolApp] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SchoolApp] SET  MULTI_USER 
GO
ALTER DATABASE [SchoolApp] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SchoolApp] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SchoolApp] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SchoolApp] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SchoolApp] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SchoolApp] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SchoolApp] SET QUERY_STORE = OFF
GO
USE [SchoolApp]
GO
/****** Object:  Table [dbo].[subjects]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[subjects](
	[SubjectId] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_subjects] PRIMARY KEY CLUSTERED 
(
	[SubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[professors]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[professors](
	[ProfessorId] [int] IDENTITY(1,1) NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Document] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Surname] [nvarchar](max) NOT NULL,
	[Age] [int] NOT NULL,
	[Direction] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_professors] PRIMARY KEY CLUSTERED 
(
	[ProfessorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[students]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[students](
	[StudentId] [int] IDENTITY(1,1) NOT NULL,
	[Document] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Surname] [nvarchar](max) NOT NULL,
	[Age] [int] NOT NULL,
	[Direction] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_students] PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[studentSubjects]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[studentSubjects](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Year] [int] NOT NULL,
	[StudentId] [int] NOT NULL,
	[SubjectId] [int] NOT NULL,
	[Grade] [real] NOT NULL,
 CONSTRAINT [PK_studentSubjects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ReportView]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[ReportView] as
SELECT
    ss.Year,
    s.Document AS StudentDocument,
    s.Name AS StudentName,
    sub.Code AS SubjectCode,
    sub.Name AS SubjectName,
    p.Document AS ProfessorDocument,
    p.Name AS ProfessorName,
    ss.Grade
FROM studentSubjects ss
left JOIN students s ON ss.StudentId = s.StudentId
left JOIN subjects sub ON ss.SubjectId = sub.SubjectId
left JOIN professors p ON ss.SubjectId = p.SubjectId;
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reports]    Script Date: 5/09/2023 7:07:41 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reports](
	[ReportId] [int] IDENTITY(1,1) NOT NULL,
	[SubjectId] [int] NOT NULL,
	[StudentSubjectId] [int] NOT NULL,
	[StudentId] [int] NOT NULL,
	[Aprobe] [nvarchar](max) NULL,
	[ProfessorId] [int] NOT NULL,
	[ProfessorsProfessorId] [int] NULL,
	[StudentsStudentId] [int] NULL,
	[SubjectsSubjectId] [int] NULL,
	[studentSubjectsId] [int] NULL,
 CONSTRAINT [PK_reports] PRIMARY KEY CLUSTERED 
(
	[ReportId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [IX_professors_SubjectId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_professors_SubjectId] ON [dbo].[professors]
(
	[SubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_reports_ProfessorsProfessorId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_reports_ProfessorsProfessorId] ON [dbo].[reports]
(
	[ProfessorsProfessorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_reports_StudentsStudentId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_reports_StudentsStudentId] ON [dbo].[reports]
(
	[StudentsStudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_reports_studentSubjectsId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_reports_studentSubjectsId] ON [dbo].[reports]
(
	[studentSubjectsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_reports_SubjectsSubjectId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_reports_SubjectsSubjectId] ON [dbo].[reports]
(
	[SubjectsSubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_studentSubjects_StudentId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_studentSubjects_StudentId] ON [dbo].[studentSubjects]
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_studentSubjects_SubjectId]    Script Date: 5/09/2023 7:07:41 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_studentSubjects_SubjectId] ON [dbo].[studentSubjects]
(
	[SubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[reports] ADD  DEFAULT ((0)) FOR [StudentSubjectId]
GO
ALTER TABLE [dbo].[reports] ADD  DEFAULT ((0)) FOR [StudentId]
GO
ALTER TABLE [dbo].[reports] ADD  DEFAULT ((0)) FOR [ProfessorId]
GO
ALTER TABLE [dbo].[professors]  WITH CHECK ADD  CONSTRAINT [FK_professors_subjects_SubjectId] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[subjects] ([SubjectId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[professors] CHECK CONSTRAINT [FK_professors_subjects_SubjectId]
GO
ALTER TABLE [dbo].[reports]  WITH CHECK ADD  CONSTRAINT [FK_reports_professors_ProfessorsProfessorId] FOREIGN KEY([ProfessorsProfessorId])
REFERENCES [dbo].[professors] ([ProfessorId])
GO
ALTER TABLE [dbo].[reports] CHECK CONSTRAINT [FK_reports_professors_ProfessorsProfessorId]
GO
ALTER TABLE [dbo].[reports]  WITH CHECK ADD  CONSTRAINT [FK_reports_students_StudentsStudentId] FOREIGN KEY([StudentsStudentId])
REFERENCES [dbo].[students] ([StudentId])
GO
ALTER TABLE [dbo].[reports] CHECK CONSTRAINT [FK_reports_students_StudentsStudentId]
GO
ALTER TABLE [dbo].[reports]  WITH CHECK ADD  CONSTRAINT [FK_reports_studentSubjects_studentSubjectsId] FOREIGN KEY([studentSubjectsId])
REFERENCES [dbo].[studentSubjects] ([Id])
GO
ALTER TABLE [dbo].[reports] CHECK CONSTRAINT [FK_reports_studentSubjects_studentSubjectsId]
GO
ALTER TABLE [dbo].[reports]  WITH CHECK ADD  CONSTRAINT [FK_reports_subjects_SubjectsSubjectId] FOREIGN KEY([SubjectsSubjectId])
REFERENCES [dbo].[subjects] ([SubjectId])
GO
ALTER TABLE [dbo].[reports] CHECK CONSTRAINT [FK_reports_subjects_SubjectsSubjectId]
GO
ALTER TABLE [dbo].[studentSubjects]  WITH CHECK ADD  CONSTRAINT [FK_studentSubjects_students_StudentId] FOREIGN KEY([StudentId])
REFERENCES [dbo].[students] ([StudentId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[studentSubjects] CHECK CONSTRAINT [FK_studentSubjects_students_StudentId]
GO
ALTER TABLE [dbo].[studentSubjects]  WITH CHECK ADD  CONSTRAINT [FK_studentSubjects_subjects_SubjectId] FOREIGN KEY([SubjectId])
REFERENCES [dbo].[subjects] ([SubjectId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[studentSubjects] CHECK CONSTRAINT [FK_studentSubjects_subjects_SubjectId]
GO
USE [master]
GO
ALTER DATABASE [SchoolApp] SET  READ_WRITE 
GO
