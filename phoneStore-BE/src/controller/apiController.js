import { registerNewUser } from "../service/registerService";
import { loginUser } from "../service/registerService"


const testAPI = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test API"
    })
}


const handleRegister = async (req, res, next) => {

    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(400).json({
                EM: "missing required parameters",
                EC: "1",
                DT: ""
            })
        }

        let data = await registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })

    }

}

const handleLogin = async (req, res, next) => {

    try {
        if (!req.body.valueLogin || !req.body.password) {
            return res.status(400).json({
                EM: "missing required parameters",
                EC: "1",
                DT: ""
            })
        }

        let data = await loginUser(req.body);

        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })

    }
}

const handleLogout = (req, res) => {

    try {
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: "clear cookie done",
            EC: 0,
            DT: ""
        })

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: ""
        })

    }
}

module.exports = {
    testAPI, handleRegister, handleLogin, handleLogout
}