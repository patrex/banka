/* eslint-disable class-methods-use-this */
import UserModel from '../models/userModel';

const userModel = new UserModel();

export default class UserController {
  async getAllAccountsByUser(req, res) {
    const { email } = req.params;
    const results = await userModel.getAllAccountsByUser({ email });

    if (results.success) {
      if (results.success.rowCount > 0) {
        res.status(200).json({
          status: 200,
          data: results.success.rows,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: 'No results found',
        });
      }
    }
  }
}
