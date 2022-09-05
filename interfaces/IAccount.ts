interface IAccount {
    id: number;
    accountNumber: string;
    accountName?: string;
    accountType: string;
    accountCurrency: string;
    ledgerBalance: number;
    availableBalance: number;
}