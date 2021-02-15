using Microsoft.EntityFrameworkCore.Migrations;

namespace faceRecognitionAPI.Migrations
{
    public partial class InitialCreate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_students_staffs_advisorId",
                table: "students");

            migrationBuilder.AlterColumn<int>(
                name: "advisorId",
                table: "students",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_students_staffs_advisorId",
                table: "students",
                column: "advisorId",
                principalTable: "staffs",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_students_staffs_advisorId",
                table: "students");

            migrationBuilder.AlterColumn<int>(
                name: "advisorId",
                table: "students",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_students_staffs_advisorId",
                table: "students",
                column: "advisorId",
                principalTable: "staffs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
