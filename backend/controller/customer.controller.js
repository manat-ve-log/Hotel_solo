import Customer from "../models/customer.model.js";


const customerController = {
    getCustomerById: async (req, res) =>{
        const { id } = req.params;
        
        try{
            const customer = await Customer.getCustomerById( id );
            res.status(200).json(customer)
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
        }
        catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error fetching customer' });
        }
    },
    getAllCustomer: async (req, res) =>{
        try{
            const customer = await Customer.getAllCustomer();
            res.status(201).json(customer)
        }catch (error){
            console.error(error);
            res.status(500).json({message:" Error fetching customer", error:error.message})
        }
    },

    createCustomer: async (req, res) =>{
        const {name, phone, email} = req.body;
        
        try{

            if (!name || !email || !phone) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            await Customer.createCustomer(name, email, phone);
            res.status(201).json({message:"customer created succesfull", data:{name, phone, email}})
        }
        catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteCustomerById: async (req, res) => {
        const {id} = req.params;

        try {
            const customer =  await Customer.deleteCustomerById(id);

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            console.error(error); 
            res.status(500).json({ message: 'Delete failed', error: error.message });
        }
    }
}

export default customerController