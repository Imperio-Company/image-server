const multer = require("multer");
const path = require("path");
// const fs = require("fs").promises;
const config = require("../config.json");
const whitelisted = [".png", ".bmp", ".jpeg", ".jpg"];
const uploadDir = path.join(__dirname, "..", "data");

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
		let curDate = new Date();
        const [day, month, year] = [curDate.getDate(), curDate.getMonth()+1, curDate.getFullYear()];
        cb(null, `${year}-${month}-${day}-${Date.now().toString(16)}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
		if (whitelisted.some(extension => ext === extension)) {
			return cb(null, true);
		}
        return cb(new Error(`The file extension ${ext.replace(".", "")} is not allowed to be uploaded`), false);
    }
}).array("files[]");

class Uploads {

    constructor() {
        throw new Error("This class may not be initiated with new");
    }

    static async upload(req, res) {
        upload(req, res, async error => {
            if (error) {
                console.error(error);
                return res.json({ message: error.message || String(error) });
            }

            const files = [];

            if (!req.files || !req.files.length) return res.status(400).json({ message: "No files" });

            for (const file of req.files) {
                files.push({
                    mimetype: file.mimetype,
                    url: `${config.externalUrl}/${file.filename}`,
                    timestamp: Date.now()
                });
            }

            return res.json({ message: `Sucessfully uploaded ${files.length} files`, files });
        });
    }

    static async getFile(req, res) {
        return res.sendFile(req.params.file, {
            root: uploadDir
        });
    }

}

module.exports = Uploads;
