import Repo from '../models/repo.model';

function load(req, res) {
  let totalCountPromise = Repo.totalCount(req.query.lang);
  let repos;

  Repo.get(req.query)
    .then((result) => {
      repos = result;
      return totalCountPromise;
    })
    .then(count => {
      res.count = count;
      res.setHeader('Access-Control-Expose-Headers', 'totalItems');
      res.setHeader('totalItems', count);
      return res.json(repos);
    })
    .catch(e => console.log(e));

}

export default { load };
