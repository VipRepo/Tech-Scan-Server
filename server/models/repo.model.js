import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const RepoSchema = new mongoose.Schema({
  id: String,
  payload: {
    pull_request: {
      base : {
        repo: mongoose.Schema.Types.Mixed
      }
    }
  }
});


RepoSchema.statics = {

  get({ skip = 0, limit = 10, lang='Java' } = {}) {
    return this.find({'payload.pull_request.base.repo.language' : { $exists: true }})
      .where('payload.pull_request.base.repo.language').equals(lang)
      // .distinct('payload.pull_request.base.repo.id')
      .sort('-payload.pull_request.base.repo.stargazers_count')
      .skip(+skip)
      .limit(+limit)
      .exec()
      .then((result) => {
        if (result) {
           console.log("Results>>>>"+result.length);
          return result;
        }
        const err = new APIError('No repo exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },


  totalCount(lang) {
    return this.count({'payload.pull_request.base.repo.language' : { $exists: true }})
      .where('payload.pull_request.base.repo.language').equals(lang)
      .exec();
  }
};

export default mongoose.model('Repo', RepoSchema, 'repo');
