import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { Candidate } from "../models/candidate.model.js";
import { Family } from "../models/family.model.js";
import { Document } from "../models/document.model.js";
import { Guardian } from "../models/guardian.model.js";

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
            sekolahAsal,
            keluarga,
            berkas,
            wali
        } = request.body

        const candidateId = uuidv4()
  
        // Create new gallery record using the Galleries model
        const newCandidate = await Candidate.create({
          id: candidateId,
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
          sekolahAsal,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        if (keluarga !== null) {
          const {
            namaAyah,
            pendidikanAyah,
            pekerjaanAyah,
            penghasilanAyah,
            namaIbu,
            pendidikanIbu,
            pekerjaanIbu,
            penghasilanIbu
          } = keluarga
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
        } else if (wali !== null) {
          const {
            nama,
            pendidikan,
            pekerjaan,
            penghasilan,
          } = wali
          // Create new gallery record using the Galleries model
          newWali = await Guardian.create({
            id: uuidv4(),
            nama,
            pendidikan,
            pekerjaan,
            penghasilan,
            createdAt: new Date(),
            updatedAt: new Date(),
            candidateId: candidateId
          });
        }

        if (berkas !== null) {
          const {
            pasPotoUrl,
            aktaUrl,
            kkUrl
          } = berkas
          // Create new gallery record using the Galleries model
          newBerkas = await Document.create({
            id: uuidv4(),
            pasPotoUrl,
            aktaUrl,
            kkUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            candidateId: candidateId
          });
        }

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
        status: "Failed", 
        code : 400,
        message : 'Error creating ppdb!'
      }
    }
  }
  
  export default {
    registerPPDB
  }
  