
import { db } from "../_lib/prisma";
import { transactionColums } from "./_columns";
import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";

const TransactionsPage = async () => {
    const transactions = await db.transaction.findMany({})

    return (
        <div className="space-y-6 p-6">
            <div className="flex w-full items-center justify-between p-6">
                <h1 className="text-2xl font-bold">Transações</h1>
                <AddTransactionButton />
            </div>

            <DataTable columns={transactionColums} data={transactions} />
        </div>
    );
}

export default TransactionsPage;