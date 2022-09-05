interface ITransaction {
    id: number;
    amount: number;
    beneficiary: string;
    sender: string;
    date: Date;
    description: string;
}

export default ITransaction