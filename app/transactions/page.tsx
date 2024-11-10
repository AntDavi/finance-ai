import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { transactionColums } from "./_columns";
import { DataTable } from "../_components/data-table";

const TransactionsPage = async () => {
    const transactions = await db.transaction.findMany({})

    return (
        <div className="space-y-6 p-6">
            <div className="flex w-full items-center justify-between p-6">
                <h1 className="text-2xl font-bold">Tdddransações</h1>
                <Button className="rounded-full">
                    Adicionar Transação
                    <ArrowDownUpIcon />
                </Button>
            </div>

            <DataTable columns={transactionColums} data={transactions} />
        </div>
    );
}

export default TransactionsPage;