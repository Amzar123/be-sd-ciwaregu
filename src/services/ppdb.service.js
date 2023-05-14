import { Op } from 'sequelize';
// import { query } from "../configs/db.config.js";
import { v4 as uuidv4 } from 'uuid';
import { Candidate } from "../models/candidate.model.js";

async function registerPPDB(request){
    // Get request Body
    console.log(request.body)
      
      try {

        const {
            studentId,
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
            sekolahAsal
        } = request.body
  
        // Create new gallery record using the Galleries model
        const newCandidate = await Candidate.create({
          id: uuidv4(),
          studentId,
          studentId,
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
  
        // Return the newly created gallery in the response
        return {
          status: "success",
          code: 201,
          message: 'PPDB created successfully!',
          data: {
            newCandidate
          }
        }
      
    } catch (err) {
      console.error(err);
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
  