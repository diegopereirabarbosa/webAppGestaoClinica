using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ApiGestaoClinica.Models;

public partial class GestaoClinicaContext : DbContext
{
    public GestaoClinicaContext()
    {
    }

    public GestaoClinicaContext(DbContextOptions<GestaoClinicaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Atendimentos> Atendimentos { get; set; }

    public virtual DbSet<Pacientes> Pacientes { get; set; }

    public virtual DbSet<Triagens> Triagens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=GestaoClinica;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Atendimentos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Atendimento");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DataHoraChegada).HasColumnType("datetime");
            entity.Property(e => e.PacienteId).HasColumnName("PacienteID");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Atendimentos)
                .HasForeignKey(d => d.PacienteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Atendimentos_Pacientes");
        });

        modelBuilder.Entity<Pacientes>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Nome).HasMaxLength(50);
            entity.Property(e => e.Sexo)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Telefone).HasMaxLength(11);
        });

        modelBuilder.Entity<Triagens>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Triagem");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Altura).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.AtendimentoId).HasColumnName("AtendimentoID");
            entity.Property(e => e.EspecialidadeId).HasColumnName("EspecialidadeID");
            entity.Property(e => e.Peso).HasColumnType("decimal(18, 4)");
            entity.Property(e => e.PressaoArterial).HasMaxLength(6);
            entity.Property(e => e.Sintomas).HasMaxLength(100);

            entity.HasOne(d => d.Atendimento).WithMany(p => p.Triagens)
                .HasForeignKey(d => d.AtendimentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Triagem_Atendimentos");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
