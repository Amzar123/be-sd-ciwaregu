/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      studentId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      guardianId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      familyId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      namaLengkap: {
        allowNull: false,
        type: Sequelize.STRING
      },
      namaPanggilan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.ENUM,
        values: ['laki-laki', 'perempuan'] 
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      agama: {
        type: Sequelize.STRING
      },
      tinggiBadan: {
        type: Sequelize.INTEGER
      },
      beratBadan: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.STRING
      },
      rw: {
        type: Sequelize.STRING
      },
      kelurahan: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      kabupaten: {
        type: Sequelize.STRING
      },
      provinsi: {
        type: Sequelize.STRING
      },
      kodePos: {
        type: Sequelize.STRING
      },
      noTelp: {
        type: Sequelize.STRING
      },
      sekolahAsal: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable('Candidates');
}
