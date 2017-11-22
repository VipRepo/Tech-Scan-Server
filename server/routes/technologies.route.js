import mongoose from 'mongoose';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {

  getTechs().then((techs) => {
      console.log('Promise resolved');

      res.send(techs.filter(tech => tech != null));
  });
  console.log('Done');
});

function getTechs() {
  return new Promise((resolve, reject) => {
      mongoose.connection.db.collection('repo').distinct('payload.pull_request.base.repo.language',
      function(error, results){
      if(error){
        return reject(error);
      }
      resolve(results);
    });
  })
}

export default router;
