import jwt from "jsonwebtoken"

export function exclude(data, keys) {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => !keys.includes(key))
    );
}

export function verifyToken(req, res, next) {
    req.session = { user: null }
    let token;
    if (req.cookies.access_token) token = req.cookies.access_token;
    try {
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
        if (!data) {
            res.status(401).json({ message: "Not authorized" })
        }
        req.session.user = data
        next()
    } catch (error) {
        req.session.user = null
        res.status(401).json({ message: "Not authorized" })
    }
}