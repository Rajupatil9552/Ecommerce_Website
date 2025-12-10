import { updateUserService, getUserProfileService , getAllUsersService} from '../service/userService.js';
import { authenticateToken, authorizeRole } from '../middleware/middleware.js';
import { validateUserBody } from '../model/userModel.js';




const getUserProfile = async (req, res) => {

    try {
        console.log(req.headers);
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const user = await getUserProfileService(req, res);
        console.log("User Profile in Controller:", user);
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }

}


const getAllUsers = async (req, res) => {

    try {
        console.log(req.headers);
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const authorized = await authorizeRole(['admin'], req);
        if (!authorized) {
            return res.send("User not authorized");
        }
        const user = await getAllUsersService(req, res);
        console.log("User Profile in Controller:", user);
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }

}

const updateUser = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const updatedUser = await updateUserService(req, res);
        res.send(updatedUser);
    }
    catch (error) {
        res.send(error.message);
    }
}

export {
    getUserProfile,
    updateUser,
    getAllUsers
}