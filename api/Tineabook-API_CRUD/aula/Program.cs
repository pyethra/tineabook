using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Text.Json;
using System.Text.Json.Nodes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

//
app.MapGet("/consultaUsuarios", () =>
{
    MySqlConnection conexao = new MySqlConnection();
    conexao.ConnectionString = 
        "server=localhost;" +
        "password= ;" +
        "User Id=root;" +
        "database=tineabookbd;";
    conexao.Open();

    MySqlCommand sql = new MySqlCommand("SELECT * FROM usuarios",conexao);

    DataTable dados = new DataTable();
    dados.Load(sql.ExecuteReader());

    conexao.Close();

    return Results.Ok(JsonDocument.Parse(JsonConvert.SerializeObject(dados)));
})
.WithName("ListarAluno");


//Cadastro Usu�rios
app.MapPost("/cadastroUsuario", ([FromBody] JsonObject dados) =>
{
    if(
        string.IsNullOrEmpty((string)dados["nome"]) || 
        string.IsNullOrEmpty((string)dados["apelido"]) || 
        string.IsNullOrEmpty((string)dados["data_nasc"]) || 
        string.IsNullOrEmpty((string)dados["email"]) || 
        string.IsNullOrEmpty((string)dados["senha"])|| 
        string.IsNullOrEmpty((string)dados["bio"]))
    {
        return Results.BadRequest(new { erro = "Campos em branco" });
    }

    MySqlConnection conexao = new MySqlConnection();
    conexao.ConnectionString =
        "server=localhost;" +
        "password= ;" +
        "User Id= root;" +
        "database=tineabookbd;";
    conexao.Open();

    MySqlCommand sql = new MySqlCommand(
        "INSERT INTO aluno(" +
            "nome," +
            "apelido," +
            "data_nasc" +
            "email" +
            "senha" +
            "bio"+
        ")" +
        "VALUES(" +
            "@nome," +
            "@apelido," +
            "@data_nasc" +
            "@email" +
            "@senha" +
            "@bio"+
        ")", 
        conexao);


    sql.Parameters.AddWithValue(
        "@nome", 
        dados["nome"]
        );
    sql.Parameters.AddWithValue(
        "@apelido", 
        dados["apelido"]
        );
    sql.Parameters.AddWithValue(
        "@data_nasc", 
        dados["data_nasc"]
        );
    sql.Parameters.AddWithValue(
        "@email", 
        dados["email"]
        );
    sql.Parameters.AddWithValue(
        "@senha", 
        dados["senha"]
        );
    sql.Parameters.AddWithValue(
        "@bio", 
        dados["bio"]
        );

    var retorno = sql.ExecuteNonQuery();

    conexao.Close();

    if(retorno == 1)
    {
        return Results.Ok();
    }
    else
    {
        return Results.Problem();
    }
    
})
.WithName("cadastroUsuario");





app.MapPost("/alterar/{id}", ([FromBody] JsonObject dados, string id) =>
{
    if (string.IsNullOrEmpty((string)dados["Nome"]) || string.IsNullOrEmpty((string)dados["email"]) || string.IsNullOrEmpty((string)dados["RG"]))
    {
        return Results.BadRequest(new { erro = "Campos em branco" });
    }

    MySqlConnection conexao = new MySqlConnection();
    conexao.ConnectionString = "server=localhost;password=aluno.etec;User Id=aluno;database=escola;";
    conexao.Open();

    MySqlCommand sql = new MySqlCommand("UPDATE aluno SET Nome = @c, email = @v, RG = @p " +
        "WHERE id = @id", conexao);
    sql.Parameters.AddWithValue("@c", dados["Nome"]);
    sql.Parameters.AddWithValue("@v", dados["email"]);
    sql.Parameters.AddWithValue("@p", dados["RG"]);
    sql.Parameters.AddWithValue("@id", id);

    var retorno = sql.ExecuteNonQuery();

    conexao.Close();

    if (retorno == 1)
    {
        return Results.Ok();
    }
    else
    {
        return Results.Problem();
    }

})
.WithName("AlterarAluno");


app.MapDelete("/excluir/{id}", ([FromBody] JsonObject dados, string id) =>
{
    MySqlConnection conexao = new MySqlConnection();
    conexao.ConnectionString = "server=localhost;password=aluno.etec;User Id=aluno;database=escola;";
    conexao.Open();

    MySqlCommand sql = new MySqlCommand("DELETE FROM aluno WHERE id = @id", conexao);
    sql.Parameters.AddWithValue("@id", id);

    var retorno = sql.ExecuteNonQuery();

    conexao.Close();

    if (retorno == 1)
    {
        return Results.Ok();
    }
    else
    {
        return Results.Problem();
    }

})
.WithName("ExcluirAluno");

app.Run();
