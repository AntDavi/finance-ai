import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

const LoginPage = () => {
    return (
        <div className="grid grid-cols-2 h-full">
            {/* Texto Esquerda */}
            <div className="flex h-full flex-col justify-center p-8 mx-auto max-w-[550px]">
                <Image
                    src="/logo.svg"
                    width={173}
                    height={39}
                    alt="Finance Ai"
                    className="mb-8"
                />
                <h1 className="text-bold text-4xl mb-3">
                    Bem-vindo
                </h1>
                <p className="text-muted-foreground mb-8">
                    A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
                </p>
                <Button variant="outline">
                    <LogInIcon className="mr-2"/>
                    Fazer login ou criar conta
                </Button>
            </div>

            {/* Imagem Direita */}
            <div className="relative h-full w-full">
                <Image
                    src="/login.png"
                    fill
                    alt="Faça Login"
                    className="object-cover"
                />
            </div>
        </div>
    );
}

export default LoginPage;