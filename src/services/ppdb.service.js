import { Op } from 'sequelize';
import bcrypt from "bcrypt";
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { v5 as uuidv5 } from 'uuid';
import { Candidate } from "../models/candidate.model.js";
import { Family } from "../models/family.model.js";
import { Document } from "../models/document.model.js";
import { Guardian } from "../models/guardian.model.js";
import ResponseClass from "../models/response.model.js";
import { Users } from '../models/users.model.js';
import { Students } from '../models/students.model.js';

async function registerPPDB(request){
    // Get request Body
    let newKeluarga = null
    let newBerkas = null
    let newWali = null
      
      try {
        const {
            namaLengkap,
            namaPanggilan, 
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            agama,
            tinggiBadan, 
            beratBadan, 
            alamat,
            rt,
            rw,
            kelurahan, 
            kecamatan,
            kabupaten,
            provinsi, 
            kodePos,
            noTelp,
            asalMuasal,
            sekolahAsal,
            namaAyah,
            pendidikanAyah,
            pekerjaanAyah,
            penghasilanAyah,
            namaIbu,
            pendidikanIbu,
            pekerjaanIbu,
            penghasilanIbu,
            namaWali,
            pendidikanWali,
            pekerjaanWali,
            penghasilanWali,
        } = request.body

        const candidateId = uuidv4()
        const shortUuid = uuidv5('mystring', candidateId).slice(0, 8);
        const noPendaftaran = 'reg-' + shortUuid
  
        // Create new gallery record using the Galleries model
        const newCandidate = await Candidate.create({
          id: candidateId,
          noPendaftaran,
          namaLengkap,
          namaPanggilan, 
          jenisKelamin,
          tempatLahir,
          tanggalLahir,
          agama,
          tinggiBadan, 
          beratBadan, 
          alamat,
          rt,
          rw,
          kelurahan, 
          kecamatan,
          kabupaten,
          provinsi, 
          kodePos,
          noTelp,
          asalMuasal,
          sekolahAsal,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'waiting'
        });

        if (namaAyah !== null && namaIbu !== null) {
          // Create new gallery record using the Galleries model
          newKeluarga = await Family.create({
            id: uuidv4(),
            namaAyah,
            pendidikanAyah,
            pekerjaanAyah,
            penghasilanAyah,
            namaIbu,
            pendidikanIbu,
            pekerjaanIbu,
            penghasilanIbu,
            createdAt: new Date(),
            updatedAt: new Date(),
            candidateId: candidateId
          });
        } else if (namaWali !== null) {
          // Create new gallery record using the Galleries model
          newWali = await Guardian.create({
            id: uuidv4(),
            nama: namaWali,
            pendidikan: pendidikanWali,
            pekerjaan: pekerjaanWali,
            penghasilan: penghasilanWali,
            createdAt: new Date(),
            updatedAt: new Date(),
            candidateId: candidateId
          });
        }

          const pasFotoUrl = request.files[0].path
          const aktaUrl = request.files[1].path
          const kkUrl = request.files[2].path

          // Create new gallery record using the Galleries model
          newBerkas = await Document.create({
            id: uuidv4(),
            pasFotoUrl,
            pasFotoFilename: request.files[0].filename,
            aktaUrl,
            kkUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            candidateId: candidateId
          });

        const result = {
          ...newCandidate["dataValues"],
          keluarga: newKeluarga,
          berkas: newBerkas,
          wali: newWali,
        }
        
        // Return the newly created gallery in the response
        return {
          status: "success",
          code: 201,
          message: 'PPDB created successfully!',
          data: result
        }
      
    } catch (err) {
      return {
        status: "failed",
        code: 500,
        message: 'Error creating PPDB!'
      }
    }
}
  
async function getPPDB(){

  try {

    const dbResult = await Candidate.findAll({ 
      attributes: ['id', 'namaLengkap', 'noPendaftaran', 'status', 'createdAt']
    });
    
    // Return the mapped Teachers in the response
    return {
      status: "success", 
      code : 200,
      message : 'Fetching PPDB successfully!',
      data : dbResult
    }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error fetching PPDB!'
    }
  }
}

async function updateVerifyPPDB(request){

  const { candidateId } = request.params
    
    try {
      // Find the existing gallery by its id using the Teachers model
      const existingCandidate = await Candidate.findByPk(candidateId);
      const existingFamily = await Family.findOne({
        where: { candidateId: candidateId },
        attributes: ['namaAyah', 'pekerjaanAyah', 'namaIbu', 'pekerjaanIbu']
      });
      const existingGuardian = await Guardian.findOne({
        where: { candidateId: candidateId },
        attributes: ['nama', 'pekerjaan']
      });
      const existingDocument = await Document.findOne({
        where: { candidateId: candidateId },
        attributes: ['pasFotoUrl', 'pasFotoFilename']
      });

      // set email default 
      const userId = uuidv4()
      const userShortUuid = uuidv5('mystring', userId).slice(0, 5);
      const defaultEmail = 'ssdc' + userShortUuid + '@sdciwaregu.com'
      
      // hash default password
      const salt = await bcrypt.genSalt();
      const defaultPass = await bcrypt.hash("Muridsdciwaregu123", salt);

      await Users.create({
        id: userId,
        name: existingCandidate.namaLengkap,
        email: defaultEmail,
        password: defaultPass,
        imageUrl: existingDocument.pasFotoUrl,
        filename: existingDocument.pasFotoFilename,
        address: existingCandidate.alamat,
        tanggalLahir: existingCandidate.tanggalLahir,
        role: "Students",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      const studentId = uuidv4()
      const shortUuid = uuidv5('mystring', studentId).slice(0, 5);
      const nis = 'nis-' + shortUuid
      await Students.create({
        id: studentId,
        nis: nis,
        tmptLahir: existingCandidate.tempatLahir,
        jenisKel: existingCandidate.jenisKelamin,
        agama: existingCandidate.agama,
        noTelp: existingCandidate.noTelp,
        tglMasuk: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
      })

      if(existingGuardian != null){
        await Students.update(
          { namaWali: existingGuardian.nama, pekerjaanWali: existingGuardian.pekerjaan, updatedAt: new Date()},
          {where: {id: studentId}}
        )
      }else if(existingFamily != null){
        await Students.update(
          { 
            namaAyah: existingFamily.namaAyah, 
            pekerjaanAyah: existingFamily.pekerjaanAyah,
            namaIbu: existingFamily.namaIbu, 
            pekerjaanIbu: existingFamily.pekerjaanIbu,
            updatedAt: new Date()
          },
          {where: {id: studentId}}
        )
      }

      // Update the existing gallery record
      const updateCandidate = await existingCandidate.update({
        status: 'verified',
        studentId: studentId,
        updatedAt: new Date()
      });
      
      // Return the updated gallery in the response
      return {
        status: "success",
        code: 200,
        message: updateCandidate.namaLengkap + ', ' + existingCandidate.noPendaftaran + ' verified successfully!'
      }
    
  } catch (err) {
    console.error(err);
    return {
      status: "Failed", 
      code : 400,
      message : 'Error updating PPDB!'
    }
  }
}

async function getHasilPpdb(query) {
  
  const { status, createdAt } = query
  const whereClause = {};
  var responseSuccess = new ResponseClass.SuccessResponse
  var responseError = new ResponseClass.ErrorResponse

  try {
    
    if (status) {
      whereClause.status = status
    }
    if (createdAt) {
      whereClause.createdAt = {
        [Op.between]: [createdAt, new Date()]
      }
    }

    const ppdbResult = await Candidate.findAll({
      where: whereClause,
      attributes: ['id', 'namaLengkap', 'noPendaftaran', 'sekolahAsal','jenisKelamin', 'status']
    })

    responseSuccess.message = "get hasil ppdb successfull!"
    responseSuccess.data = ppdbResult
    return responseSuccess

  } catch (error) {
    console.log(error)
    responseError.message = "Failed to access database"
    return responseError
  }
}

async function getPpdbDetails(request) {
  
  const ppdbId = request.params.candidateId
  var responseSuccess = new ResponseClass.SuccessResponse
  var responseError = new ResponseClass.ErrorResponse

  let familyResult = null
  let guardianResult = null
  
  try {
    const candidateResult = await Candidate.findOne({
      where: {id: ppdbId}
    })
    const documentResult = await Document.findOne({
      where: {candidateId: ppdbId}
    })

    familyResult = await Family.findOne({
      where: {candidateId: ppdbId}
    })
    guardianResult = await Guardian.findOne({
      where: {candidateId: ppdbId}
    })

    
    const ppdbDetailsResult = {
      ...candidateResult['dataValues'],
      keluarga: familyResult,
      wali: guardianResult,
      berkas: documentResult
    }
    
    responseSuccess.message = `Get details ppdb ${ppdbDetailsResult.noPendaftaran} successfull!`
    responseSuccess.data = ppdbDetailsResult
    return  responseSuccess

  } catch (error) {
    console.log(error)
    responseError.message = "Internl Server Error"
    return  responseError
  }
}

export default {
  registerPPDB,
  getPPDB,
  updateVerifyPPDB,
  getHasilPpdb,
  getPpdbDetails
}
  