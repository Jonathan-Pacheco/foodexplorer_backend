const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const DiskStorage = require("../providers/DiskStorage")

class DishesController {
  async create(request, response) {
     const {dishname,dishcategory,dishprice,description,tags} = request.body; 
 
     const database = await sqliteConnection();

     const checkAlreadyExists = await database.get(
      "SELECT * FROM dishes WHERE dishname = ?",
      dishname
    );    
      if(checkAlreadyExists){
          
          return response.status(201).json({"message":"Este prato já existe."});
      }
 
      const imageFileName = request.file.filename; 
      const diskStorage = new DiskStorage()
 
      const image = await diskStorage.saveFile(imageFileName);
 
      const tag = tags

     
     const insert = await database.run(
      "INSERT INTO dishes (dishname,dishcategory,dishprice,description,tags,image) VALUES (?,?,?,?,?,?)",
      [ dishname,dishcategory,dishprice,description,tag,image]
    ); 
    
    return response.status(201).json({"message":"Prato criado com Sucesso","id":insert.lastID});
 }


 async update(request, response) {
  const {dishname,dishcategory,dishprice,description,tags} = request.body; 
  const { id } = request.params;
  const database = await sqliteConnection();
  
  const getData = await database.get(
   "SELECT * FROM dishes WHERE id = ?",
   id
 );    
   if(!getData){
       throw new AppError("Este prato não existe.")
   }

   const diskStorage = new DiskStorage()
     
    
    const imageFileName = request.file ?request.file.filename:''; 

    const image =  request.file ?await diskStorage.saveFile(imageFileName):''
    
    if (image !== '') { 
      await diskStorage.deleteFile(getData.image);
    }

  
  getData.image = image !== '' ? image : getData.image;

  getData.dishname = dishname ?? getData.dishname;
  getData.description = description ?? getData.description;
  getData.dishcategory = dishcategory ?? getData.dishcategory;
  getData.dishprice = dishprice ?? getData.dishprice;
  getData.tags =tags ?? getData.tags;

  
  await database.run(
    "UPDATE dishes SET dishname = ?, dishcategory = ?, dishprice = ?, description = ?, tags = ?, image = ? WHERE id = ?",
    [getData.dishname, getData.dishcategory, getData.dishprice, getData.description, getData.tags, getData.image, getData.id]
  );
  
 return response.status(201).json({"message":"Prato Atualizado com Sucesso"});
}


 async delete(request, response) {
  try {
    const { id } = request.params;
    
    const database = await sqliteConnection();

    const checkExists = await database.get(
      "SELECT * FROM dishes WHERE id = ?",
      id
    );

    if (!checkExists) {
      return response.status(404).json({ error: "Prato não encontrado" });
    }

    await database.run("DELETE FROM dishes WHERE id = ?", id);

    return response.status(200).json({ message: "Prato removido com sucesso" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
}


 async select(request, response) {
  try {
    const { id,search } = request.params;
    
    const database = await sqliteConnection();
    let search_query='';

    let query = "SELECT * FROM dishes";


    if(search!=='' && search){
      search_query=' WHERE dishname like "%'+search+'%" OR tags like "%'+search+'%"'
    }


    if (id) {
      query += " WHERE id = ?  ORDER BY dishname ASC";
    } else {
      query += search_query+"  ORDER BY dishname ASC";
    }
 
    const result = id
      ? await database.get(query, id)
      : await database.all(query);

    if (!result) {
      return response.status(404).json({ error: "Prato não encontrado" });
    }

    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal server error" });
  }
}


}
module.exports = DishesController;