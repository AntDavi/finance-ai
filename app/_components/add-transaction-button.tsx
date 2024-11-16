'use client'

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { z } from "zod";
import { TransactionCategory, TransactionPaymentMethod, TransactionType } from "@prisma/client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TRANSACTION_CATEGORY_OPTIONS, TRANSACTION_TYPE_OPTIONS } from "../_constants/transactions";
import { DatePicker } from "./ui/date-picker";

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "Nome é obrigatório",
    }),
    amount: z.string().trim().min(1, {
        message: "Quantia é obrigatório",
    }),
    type: z.nativeEnum(TransactionType, {
        required_error: "Tipo é obrigatório",
    }),
    category: z.nativeEnum(TransactionCategory, {
        required_error: "Categoria é obrigatório",
    }),
    paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
        required_error: "O método de pagamento é obrigatório",
    }),
    date: z.date({
        required_error: "Data é obrigatório",
    })
})

type FormSchema = z.infer<typeof formSchema>

const AddTransactionButton = () => {

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            category: TransactionCategory.OTHER,
            date: new Date(),
            name: "",
            paymentMethod: TransactionPaymentMethod.CASH,
            type: TransactionType.EXPENSE,
        }
    })

    const onSubmit = (data: FormSchema) => {
        console.log(data)
    }

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                form.reset()
            }
        }}>
            <DialogTrigger asChild>
                <Button className="rounded-full font-bold">
                    Adicionar Transação
                    <ArrowDownUpIcon />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Transação</DialogTitle>
                    <DialogDescription>Insira as informações abaixo</DialogDescription>
                </DialogHeader>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valor</FormLabel>
                                    <FormControl>
                                        <MoneyInput placeholder="Digite o valor..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TRANSACTION_TYPE_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a categoria..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data</FormLabel>
                                    <DatePicker value={field.value} onChange={field.onChange} />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Adicionar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}

export default AddTransactionButton;