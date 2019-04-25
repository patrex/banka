/* eslint-disable class-methods-use-this */
import UserModel from '../models/userModel';

const userModel = new UserModel();

export default class UserController {
  async getAllAccountsByUser(req, res) {
    const { email } = req.params;
    const results = await userModel.getAllAccountsByUser({ email });

    console.log(results);
  }
}
