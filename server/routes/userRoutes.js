
import Router from 'express';
import { getUserProfile, updateUser , getAllUsers} from '../controller/userController.js'

const userRouter = Router();


//get user profile
userRouter.get('/profile' , getUserProfile)

//update user profile
userRouter.put('/update-profile' , updateUser)

//get all Users : admin
userRouter.get('/get-all-users' , getAllUsers)



export default userRouter;
