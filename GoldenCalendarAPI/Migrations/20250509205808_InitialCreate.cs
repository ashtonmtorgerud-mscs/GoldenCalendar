using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldenCalendarAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Yuu_Id = table.Column<int>(type: "int", nullable: false),
                    Yuu_SelectedHead = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedEyes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedMouth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedHair = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedBackHair = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedBeard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedNose = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_SelectedGlasses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_Hue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_Brightness = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_Saturation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_XOffset = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_YOffset = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_XScale = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Yuu_YScale = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Social",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContactId = table.Column<int>(type: "int", nullable: false),
                    Platform = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Handle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Social", x => new { x.ContactId, x.Id });
                    table.ForeignKey(
                        name: "FK_Social_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    GoalModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Goals_GoalModelId",
                        column: x => x.GoalModelId,
                        principalTable: "Goals",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_GoalModelId",
                table: "Tasks",
                column: "GoalModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Social");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Goals");
        }
    }
}
