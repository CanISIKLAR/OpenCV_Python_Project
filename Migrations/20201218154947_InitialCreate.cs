using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace faceRecognitionAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "classes",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    courseName = table.Column<string>(type: "TEXT", nullable: true),
                    courseCode = table.Column<string>(type: "TEXT", nullable: true),
                    isDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "staffs",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(type: "TEXT", nullable: true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    surname = table.Column<string>(type: "TEXT", nullable: true),
                    role = table.Column<string>(type: "TEXT", nullable: true),
                    passwordHash = table.Column<byte[]>(type: "BLOB", nullable: true),
                    passwordSalt = table.Column<byte[]>(type: "BLOB", nullable: true),
                    isDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_staffs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "schedules",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    classId = table.Column<int>(type: "INTEGER", nullable: false),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    staffId = table.Column<int>(type: "INTEGER", nullable: false),
                    isDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_schedules", x => x.id);
                    table.ForeignKey(
                        name: "FK_schedules_classes_classId",
                        column: x => x.classId,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "students",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: true),
                    advisorId = table.Column<int>(type: "INTEGER", nullable: false),
                    surname = table.Column<string>(type: "TEXT", nullable: true),
                    studentNumber = table.Column<string>(type: "TEXT", nullable: true),
                    confirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    isDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_students", x => x.id);
                    table.ForeignKey(
                        name: "FK_students_staffs_advisorId",
                        column: x => x.advisorId,
                        principalTable: "staffs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassStudents",
                columns: table => new
                {
                    classesid = table.Column<int>(type: "INTEGER", nullable: false),
                    studentsid = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassStudents", x => new { x.classesid, x.studentsid });
                    table.ForeignKey(
                        name: "FK_ClassStudents_classes_classesid",
                        column: x => x.classesid,
                        principalTable: "classes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassStudents_students_studentsid",
                        column: x => x.studentsid,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    url = table.Column<string>(type: "TEXT", nullable: true),
                    description = table.Column<string>(type: "TEXT", nullable: true),
                    dateAdded = table.Column<DateTime>(type: "TEXT", nullable: false),
                    isMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    publicId = table.Column<string>(type: "TEXT", nullable: true),
                    studentsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Photos_students_studentsId",
                        column: x => x.studentsId,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentAttendances",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    studentsId = table.Column<int>(type: "INTEGER", nullable: false),
                    scheduleId = table.Column<int>(type: "INTEGER", nullable: false),
                    attended = table.Column<bool>(type: "INTEGER", nullable: false),
                    isDeleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_studentAttendances", x => x.id);
                    table.ForeignKey(
                        name: "FK_studentAttendances_schedules_scheduleId",
                        column: x => x.scheduleId,
                        principalTable: "schedules",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_studentAttendances_students_studentsId",
                        column: x => x.studentsId,
                        principalTable: "students",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassStudents_studentsid",
                table: "ClassStudents",
                column: "studentsid");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_studentsId",
                table: "Photos",
                column: "studentsId");

            migrationBuilder.CreateIndex(
                name: "IX_schedules_classId",
                table: "schedules",
                column: "classId");

            migrationBuilder.CreateIndex(
                name: "IX_studentAttendances_scheduleId",
                table: "studentAttendances",
                column: "scheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_studentAttendances_studentsId",
                table: "studentAttendances",
                column: "studentsId");

            migrationBuilder.CreateIndex(
                name: "IX_students_advisorId",
                table: "students",
                column: "advisorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassStudents");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "studentAttendances");

            migrationBuilder.DropTable(
                name: "schedules");

            migrationBuilder.DropTable(
                name: "students");

            migrationBuilder.DropTable(
                name: "classes");

            migrationBuilder.DropTable(
                name: "staffs");
        }
    }
}
