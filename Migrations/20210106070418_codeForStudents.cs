using Microsoft.EntityFrameworkCore.Migrations;

namespace faceRecognitionAPI.Migrations
{
    public partial class codeForStudents : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "code",
                table: "students",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "code",
                table: "students");
        }
    }
}
