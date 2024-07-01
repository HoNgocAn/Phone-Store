import userservice from "../service/userservice";

const homePage = async (req, res) => {
    let userList = await userservice.getListUsers();
    return res.render("home.ejs", { userList });
}

const handleCreateUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userservice.createNewUser(email, password, username);
    return res.redirect("/")
}


const handleDeleteUser = async (req, res) => {

    let id = req.params.id

    await userservice.deleteUser(id)

    return res.redirect("/")
}

const handleUpdatePage = async (req, res) => {
    let id = req.params.id
    let user = await userservice.getUserById(id);
    return res.render("update.ejs", { user })
}

const handleUpdateUser = async (req, res) => {
    let id = req.params.id
    let email = req.body.email;
    let username = req.body.username;
    await userservice.updateUser(email, username, id);
    return res.redirect("/")
}

module.exports = {
    homePage, handleCreateUser, handleDeleteUser, handleUpdatePage, handleUpdateUser
}