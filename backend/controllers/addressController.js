import Address from '../models/Address.js';

export const getAddress = async (req, res) => {
  try {
    const userEmail = req.user?.user?.email;
    if (!userEmail) return res.status(401).json({ success: false });

    // find address by user id using the token payload id
    const userId = req.user.user.id;
    const address = await Address.findOne({ userId });
    if (!address) return res.json({ success: true, address: null });
    return res.json({ success: true, address });
  } catch (error) {
    console.error('addressController.getAddress:', error);
    return res.status(500).json({ success: false });
  }
};

export const saveAddress = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const { city, pincode, phone, landmark, houseNumber } = req.body;

    if (!city || !pincode || !phone) {
      return res.status(400).json({ success: false, message: 'Missing required address fields' });
    }

    // upsert one address per user
    const updated = await Address.findOneAndUpdate(
      { userId },
      { city, pincode, phone, landmark, houseNumber },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ success: true, address: updated });
  } catch (error) {
    console.error('addressController.saveAddress:', error);
    return res.status(500).json({ success: false });
  }
};

export default { getAddress, saveAddress };
