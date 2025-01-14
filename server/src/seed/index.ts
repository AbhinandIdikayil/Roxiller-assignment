const initializeDatabase = async () => {
    try {
        // Check if data already exists
        const existingData = await Transaction.countDocuments();
        if (existingData > 0) {
            console.log('Database already initialized');
            return { message: 'Database already initialized' };
        }

        // Fetch data from third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Process and insert data
        const formattedTransactions = transactions.map(transaction => ({
            ...transaction,
            dateOfSale: new Date(transaction.dateOfSale)
        }));

        await Transaction.insertMany(formattedTransactions);
        return { message: 'Database initialized successfully', count: formattedTransactions.length };
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};