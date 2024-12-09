export const schemaValidator = (schema) => (req, res, next) => {
    try {
        const result = schema.parse(req.body);
        next();
    }catch (result) {
        return res.status(400).json({Error: result.errors.map((data) => data.message)})
    }
}