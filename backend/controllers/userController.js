

export const getUser = async(req, res) => {
    try {
        const user = req.user;
        
        return res.json({success: true, user})
    } catch (error) {
        console.log((error));
        return res.json({success: false, message: error})
    }
}